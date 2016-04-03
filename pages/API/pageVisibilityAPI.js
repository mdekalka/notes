var pageVisibilityAPI = (function(app) {
    var Utils = app.Utils;

    var PageVisibility = {
        browserPrefixes: ['webkit', 'moz', 'ms', 'o'],

        init: function() {
            var $ = Utils.$;
            var onVisibilityChangeThis = onVisibilityChange.bind(this);

            this.logger = $('.visibility-logger');
            this.initialStatus = $('.visibility span');
            this.audio = $('.audio');

            // get the browser prefix if needed
            this.visibilityProp = this.getPrefix();
            // change audio volume
            this.changeAudioVolume(0.2);
            // set initial visible status
            this.setInitialStatus();

            document.addEventListener(this.visibilityProp.event, onVisibilityChangeThis, false);
        },

        changeAudioVolume: function(number) {
            this.audio.volume = number || 0.5;
        },

        setInitialStatus: function() {
            this.initialStatus.textContent = document[this.visibilityProp.hidden] ? 'hidden' : 'visible';
        },

        addLoggerItem: function() {
            var currentTime = new Date().toTimeString().split(' ')[0];
            var newState = document.createElement('div');
            var visibilityState = document[this.visibilityProp.hidden] ? 'hidden' : 'visible';

            newState.innerHTML = '<span class="highlight">'+currentTime+'</span> Page visibility changed to <span class="highlight">'+visibilityState+'</span>';

            this.logger.appendChild(newState);
        },

        handleVisibilityChange: function() {
            if (document[this.visibilityProp.hidden]) {
                this.audio.pause();
            } else {
                this.audio.play();
            }
        },

        getPrefix: function() {
            var hidden;
            var event;

            if (document.hidden !== 'undefined') {
                hidden = 'hidden';
                event = 'visibilitychange';
            } else {
                this.browserPrefixes.forEach(function(pref) {
                    if (document[pref + 'Hidden'] !== undefined) {
                        hidden = pref + 'Hidden';
                        event = pref + 'visibilitychange';
                        return;
                    }
                })
            }

            return {
                hidden: hidden,
                event: event
            };
        }
    };

    function onVisibilityChange(event) {
        this.addLoggerItem();
        this.handleVisibilityChange();
    };

    app.PageVisibility = PageVisibility;

    return app;
})(Application || {});

$(document).ready(function() {
    pageVisibilityAPI.PageVisibility.init();
});