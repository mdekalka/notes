var fileAPI = (function(app) {
    var Utils = app.Utils;
    var $ = Utils.$;

    var FileReaderInterface = {
        init: function() {
            var onChangeHandlerThis = onChangeHandler.bind(this);

            this.logger = $('.logger');
            this.inputReader = $('#input');

            this.inputReader.addEventListener('change', onChangeHandlerThis);
        },

        addLog: function(event) {
            var currentTime = new Date().toTimeString().split(' ')[0];
            var infoState = document.createElement('div');
            infoState.innerHTML = '<span class="highlight">'+currentTime+'</span> - FileName:<span class="highlight"> ' + event.name + '</span>, type:<span class="highlight"> ' + event.type + '</span>, size:<span class="highlight"> ' + event.size + '</span>, date:<span class="highlight"> ' + event.date + '</span>';

            this.logger.appendChild(infoState);
        }
    };

    function onChangeHandler(event) {
        var files = event.target.files;
        var fileInfo;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();

            reader.addEventListener('load', function() {
                // result here
            });
            reader.readAsText(file);

            fileInfo = {
                name: file.name,
                type: file.type,
                size: file.size,
                date: file.lastModifiedDate
            };
            this.addLog(fileInfo);
        }
    }

    app.FileReaderInterface = FileReaderInterface;

    return app;
})(Application || {});

$(document).ready(function() {
    fileAPI.FileReaderInterface.init();
});