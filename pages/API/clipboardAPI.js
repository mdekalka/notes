var ClipboardAPI = (function(app) {
    var Utils = app.Utils;

    var Clipboard = {
        init: function() {
            var $ = Utils.$;
            var onCutClickHandlerThis = onCutClickHandler.bind(this);
            var onCopyClickHandlerThis = onCopyClickHandler.bind(this);
            var loggerHandlerThis = loggerHandler.bind(this);

            this.logger = $('.logger');
            this.cutText = $('#cut-text');
            this.copyText = $('.copy-text > p');
            this.cutButton = $('.cut-action');
            this.copyButton = $('.copy-action');

            this.cutButton.addEventListener('click', onCutClickHandlerThis);
            this.copyButton.addEventListener('click', onCopyClickHandlerThis);

            document.addEventListener('cut', loggerHandlerThis);
            document.addEventListener('copy', loggerHandlerThis);
            document.addEventListener('paste', loggerHandlerThis);
        },

        execCommand: function(command, selector) {
            // Do not use document.queryCommandSupported('copy') to check if copy is enabled - seems it's buggy now
            // https://code.google.com/p/chromium/issues/detail?id=476508
            var range;
            var selection;

            if (command && selector) {
                switch (command) {
                    case 'copy':
                        range = document.createRange();
                        selection = window.getSelection();
                        range.selectNode(selector);
                        selection.addRange(range);

                        try {
                            var successful = document.execCommand('copy');
                            var msg = successful ? 'successful' : 'unsuccessful';
                            this.addLog('<span class="highlight">copy</span> command was <span class="highlight">'+msg+'</span>');
                        } catch (err) {
                            this.addLog('execCommand Error', err);
                        }
                        selection.removeAllRanges();
                        break;

                    case 'cut':
                        selector.select();
                        try {
                            var successful = document.execCommand('cut');
                            var msg = successful ? 'successful' : 'unsuccessful';
                            this.addLog('<span class="highlight">cut</span> command command was <span class="highlight">'+msg+'</span>');
                        } catch (err) {
                            this.addLog('execCommand Error', err);
                        }
                        break;
                }
            }
        },

        addLog: function(action) {
            var currentTime = new Date().toTimeString().split(' ')[0];
            var loggerBlock = document.createElement('div');

            loggerBlock.innerHTML = '<span class="highlight">'+currentTime+'</span>'+ ' - '+action;
            this.logger.appendChild(loggerBlock);
        }
    };

    function loggerHandler(event) {
        var msg = '<span class="highlight">'+event.type+'</span>' + ' action was performed.';
        this.addLog(msg);
    };

    function onCutClickHandler(event) {
        this.execCommand('cut', this.cutText);
    };

    function onCopyClickHandler(event) {
        this.execCommand('copy', this.copyText);
    }

    app.Clipboard = Clipboard;

    return app;
})(Application || {});

$(document).ready(function() {
    ClipboardAPI.Clipboard.init();
});



