var fullscreenAPI =  (function(app) {
    var Utils = app.Utils;

    var FullscreenInterface = {
        browserPrefixes: ['webkit', 'moz', 'ms'],

        init: function() {
            var $ = Utils.$;
            var event;
            var onFullScreenChangeThis = onFullScreenChange.bind(this);

            this.logger = $('.logger');
            this.fsDocument = $('.fullscreen-document');
            this.fsElement = $('.fullscreen-avatar');

            this.fsConfig = this.getPrefix();

            this.fsDocument.addEventListener('click', onFullScreenHandlerThis.bind(this, document.documentElement));
            this.fsElement.addEventListener('click', onFullScreenHandlerThis.bind(this, $('.fullscreen-img')));

            document.addEventListener(this.fsConfig.event.toLowerCase(), onFullScreenChangeThis);
        },

        addLog: function(state) {
            var currentTime = new Date().toTimeString().split(' ')[0];
            var loggerBlock = document.createElement('div');

            loggerBlock.innerHTML = '<span class="highlight">'+currentTime+'</span>' + ' ' + state;
            this.logger.appendChild(loggerBlock);
        },

        getPrefix: function() {
            var event;
            var screen;
            var exit;
            var element;
            var enabled;
            var request;

            if ('requestFullscreen' in document.documentElement) {
                screen = 'fullscreen';
                event = 'fullscreenchange';
                exit = 'exitFullscreen';
                element = 'fullscreenElement';
                enabled = 'fullscreenEnabled';
                request = 'requestFullscreen';
            } else {
                this.browserPrefixes.forEach(function(prefix) {
                    if (document.documentElement[prefix+'RequestFullScreen'] !== undefined) {
                        event = prefix+'Fullscreenchange';
                        screen = prefix+'Fullscreen';
                        enabled = prefix+'Enabled';
                        request = prefix+'RequestFullScreen';

                        if (prefix === 'moz') {
                            exit = prefix+'CancelFullScreen';
                            element = prefix+'FullScreenElement';
                        } else {
                            exit = prefix+'ExitFullscreen';
                            element = prefix+'FullscreenElement';
                        }
                        return;
                    }
                });
            }

            return {
                event: event,
                screen: screen,
                exit: exit,
                element: element,
                enabled: enabled,
                request: request
            }
        }
    };

    function onFullScreenChange(event) {
        var element = 'VOID';

        if (document[this.fsConfig.element]) {
          element = document[this.fsConfig.element].nodeName;
        }
        this.addLog('Fullscreen element is <span class="highlight">'+element+'</span>');
    }

    function onFullScreenHandlerThis(element, event) {
        var _this = this;

        if (element) {
            var fsPromise = element[this.fsConfig.request]();

            if (fsPromise && fsPromise.catch) {
                fsPromise.catch(function(error) {
                    _this.addLog('Cannot acquire fullscreen mode: ' + error);
                });
            }
        }
    };

    app.FullscreenInterface = FullscreenInterface;

    return app;
})(Application || {});

$(document).ready(function() {
    fullscreenAPI.FullscreenInterface.init();
});