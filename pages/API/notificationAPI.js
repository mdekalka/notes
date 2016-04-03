var notificationAPI = (function(app) {
    var Utils = app.Utils;

    var NotificationInterface = {
        permissionState: {
            GRANTED: 'granted',
            DENIED: 'denied',
            DEFAULT: 'default'
        },

        log: function(event) {
            var rowItem = document.createElement('div');
            var rowEvent = document.createElement('span');

            rowItem.textContent = 'Сработало событие: ';
            rowEvent.classList.add('highlight');
            rowEvent.textContent = event;
            rowItem.appendChild(rowEvent)

            this.loggerArea.appendChild(rowItem);
        },

        currentPermission: Notification.permission,

        isSupported: function() {
            return ('Notification' in window);
        },

        updateStatus: function() {
            this.notificationStatus.textContent = this.currentPermission;
        },

        getFormData: function(callback) {
            var title = this.titleForm.value;
            var body = this.bodyForm.value;
            var tag = this.tagForm.value;

            if (title) {
                var config = {
                    body: body,
                    tag: tag,
                    icon: 'https://avatars1.githubusercontent.com/u/5993559?v=3&s=460'
                };

                callback && callback(title, config);
            } else {
                alert('Title input is required');
            }
        },

        checkNotificationStatus: function() {
            if (this.isSupported()) {
                var _this = this;

                switch (Notification.permission) {
                    case this.permissionState.GRANTED:
                        _this.getFormData(function(title, config) {
                            if (title) {
                                var notification = new Notification(title, config);

                                notification.onshow = function() { _this.log('onShow'); };
                                notification.onclick = function() { _this.log('onClick'); };
                                notification.onclose = function() { _this.log('onClose'); };
                                notification.onerror = function() { _this.log('onError'); };
                            }
                        });
                        break;

                    case this.permissionState.DENIED:
                        console.log('Oops');
                        break;

                    case this.permissionState.DEFAULT:
                        Notification.requestPermission(function(permission) {
                            _this.currentPermission = permission;
                        });
                        break;
                }

                this.updateStatus();
            }
        },

        init: function() {
            var onNotifyBtnClickThis = onNotifyBtnClick.bind(this);
            var $ = Utils.$;

            this.notifyBtn = $('.notify');
            this.notificationStatus = $('.notification-status span');
            this.titleForm = $('input[name=title]');
            this.bodyForm = $('input[name=body]');
            this.tagForm = $('input[name=tag]');
            this.loggerArea = $('.loggerArea')

            this.notifyBtn.addEventListener('click', onNotifyBtnClickThis);

            this.updateStatus();
        }
    }

    function onNotifyBtnClick(event) {
        this.checkNotificationStatus();
    }

    app.NotificationInterface = NotificationInterface;

    return app;
})(Application || {});

$(document).ready(function() {
    notificationAPI.NotificationInterface.init();
});
