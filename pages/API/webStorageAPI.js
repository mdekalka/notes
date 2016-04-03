var webStorage = (function(app) {
    var Utils = app.Utils;
    var $ = Utils.$;

    var Storage = {
        isAvailable: function(type) {
            try {
                var storage = window[type];
                var data = 'testItem';
                storage.setItem(data, data);
                storage.removeItem(data);
                return true;
            } catch(e) {
                return false;
            }
        },

        init: function(type) {
            var onStorageChangeHandlerThis = onStorageChangeHandler.bind(this);

            this.storage = type || 'sessionStorage';
            this.logger = $('.logger');

            window.addEventListener('storage', onStorageChangeHandlerThis);
        },

        set: function(keyName, itemToSave) {
            var data;

            if (keyName) {
                try {
                    if (typeof itemToSave === 'string') {
                        data = itemToSave;
                    } else {
                        data = JSON.stringify(itemToSave);
                    }
                } catch(e) {
                    throw new Error('Set failed');
                }
                window[this.storage].setItem(keyName, data);
            }
        },

        get: function(keyName) {
            if (keyName) {
                try {
                    var data = window[this.storage].getItem(keyName);

                    if (data[0] === '{' || data[0] === '[') {
                        return JSON.parse(data);
                    }
                    return data;
                } catch(e) {
                    throw new Error('Get failed')
                }
            }
        },

        remove: function(keyName) {
            window[this.storage].removeItem(keyName);
        },

        clear: function() {
            window[this.storage].clear();
        },

        length: function() {
            return window[this.storage].length;
        },

        key: function(key) {
            if (Number.isInteger(key)) {
                return window[this.storage].key(key);
            }
        },

        addLog: function(change) {
            var currentTime = new Date().toTimeString().split(' ')[0];
            var addBlock = document.createElement('div');

            addBlock.innerHTML = currentTime+ ' '+change;

            this.logger.appendChild(addBlock);
        }
    };

    function onStorageChangeHandler(event) {
        debugger
        var message = 'Change in ' +this.storage+': key' + event.key + 'changed from ' + '<span class="highlight">'+event.oldValue+'</span> to <span class="highlight">'+event.newValue+'</span>';
        this.addLog(message);
    }

    app.Storage = Storage;

    return app;
})(Application || {});


$(document).ready(function() {
    if (webStorage.Storage.isAvailable('localStorage')) {
        var storage = Application.Storage;

        storage.init('localStorage');
        storage.set('name', 'myName');
        storage.set('surname', 'mySurname');

        storage.get('name');

        var obj = {
            name: 'piupiupiu',
            surname: 'piupiupiu',
            age: 25,
            arr: {
                a: [1,2,3]
            }
        }
        storage.set('obj', obj);
        var get = storage.get('obj');
    }
});