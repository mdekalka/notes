var geolocationAPI = (function(app) {
    var Utils = app.Utils;

    var GeolocationInterface = {
        init: function() {
            var $ = Utils.$;
            var onShareLocationHandlerThis = onShareLocationHandler.bind(this);

            this.logger = $('.logger');
            this.locationBtn = $('.geo');

            this.locationBtn.addEventListener('click', onShareLocationHandlerThis);

            this.initMap();

        },

        isSupported: function() {
            return ('geolocation' in navigator);
        },

        appendLocation: function(position, status) {
            var appendBlock = document.createElement('div');
            var coords;

            status = status || 'updated';
            appendBlock.innerHTML = 'Location was ' +'<span class="highlight">'+status+'</span>. Your coordinates is ' + '<span class="highlight">'+position.coords.latitude + ', ' + position.coords.longitude + '</span>';

            coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            this.initMap(coords, 18);
            this.logger.appendChild(appendBlock);
        },

        getCurrentPosition: function() {
            var _this = this;

            if (this.isSupported()) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    _this.appendLocation(position, 'fetched');

                    _this.watchCurrentPosition();
                });
            };
        },
        watchCurrentPosition: function() {
            var _this = this;

            if (this.isSupported()) {
                navigator.geolocation.watchPosition(function(position) {
                    _this.appendLocation(position, 'updated');
                });
            }
        },

        initMap: function(coords, zoom) {
            var _this = this;

            this.map = {};
            this.coords = coords || {lat: -25.363, lng: 131.044};
            var zoom = zoom || 5;

            this.map = new google.maps.Map(document.querySelector('.map'), {
                center: _this.coords,
                zoom: zoom
            });

            this.marker = new google.maps.Marker({
                icon: 'https://avatars0.githubusercontent.com/u/5993559?v=3&s=40',
                position: _this.coords,
                map: _this.map,
                title: 'Click to zoom'
            });
        }
    };

    function onShareLocationHandler(event) {
        this.getCurrentPosition();
    };

    app.GeolocationInterface = GeolocationInterface;

    return app;
})(Application || {});

$(document).ready(function() {
    geolocationAPI.GeolocationInterface.init();
});