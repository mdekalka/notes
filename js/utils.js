var Application = (function(app) {
    var Utils = {
        $: function(selector, context) {
            return (context || document).querySelector(selector);
        }

    };

    app.Utils = Utils;
    
    return app;
})(Application || {});



if (!Number.isInteger) {
    Number.isInteger = function(value) {
      return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };
}
