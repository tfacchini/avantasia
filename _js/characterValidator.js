(function($) {

    $.characterValidator = function(element, options) {

        // plugin's default options
        var defaults = {
            style:      "free",
            maxlength:  0,          // infinite
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
             element = element;    // reference to the actual DOM element

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            $("#"+element.id).keydown(function(e) {

                var fieldLength     = $("#"+element.id).text().length;
                var code            = e.keyCode || e.which;
                var userSelection   = window.getSelection();


                if ((code == 8) || (code == 46) || (code == 37) || (code == 39) || (code == 40) || (code==38) || (code ==9) || (code == 16)) { return; }        // Allow navigational keys to keep working

                if (fieldLength >= plugin.settings.maxlength) {                                                                                 // Allow keydown when something is highlighted to be replaced
                    if (userSelection.type != "Range") {
                        invalidEntry(e);
                        return;
                    }
                }

                switch(plugin.settings.style) {
                    case "free":
                        break;
                    case "numbers":
                        if ((code < 47) || (code > 58)) {
                            invalidEntry(e);
                        }
                        break;

                    case "text":
                        break;
                    case "alpha":
                        break;
                }
            });

        }

        // public methods
        plugin.foo_public_method = function() {
        }

        // private methods
        var invalidEntry = function(e) {
            e.preventDefault();
            $("#"+element.id).effect('shake', { distance: 5 });
            // code goes here
        }

        // fire up the plugin!
        plugin.init();

    }

    // add the plugin to the jQuery.fn object
    $.fn.characterValidator = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == $(this).data('pluginName')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.characterValidator(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                $(this).data('characterValidator', plugin);

            }

        });

    }

})(jQuery);