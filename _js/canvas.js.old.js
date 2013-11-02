(function($) {

    $.avaCanvas = function(element, options) {
        var canvas;
        var c;

        var defaults = {
            minWidth:       768,
            minHeight:      384,
            canvasCols:     12,
            canvasRows:     12,
            tileWidth:      64,
            tileHeight:     32          
        }

        var plugin      = this;
        plugin.settings = {}

        var $element = $(element),
             element = element;

        // Canvas Functions
        // *****************

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
           
            // starting canvas
            canvas  = document.getElementById(Ava_CanvasStage);
            c       = canvas.getContext('2d');
            
            $("#"+Ava_CanvasFrame).attr("width", plugin.settings.minWidth ).attr("height", plugin.settings.minHeight);
            $("#"+Ava_CanvasStage).attr("width", plugin.settings.minWidth ).attr("height", plugin.settings.minHeight);
        }





        // Canvas Setters & Getters
        //*************************

        plugin.setCanvasCols = function(cols) {
            if (cols) {
                plugin.settings.canvasCols = cols;
                console.log("Cols setted to " + cols);
            }
            return;
        }
        plugin.getCanvasCols = function() {                  return(plugin.settings.canvasCols); }

        plugin.setCanvasRows = function(rows) {
            if (rows) {
                plugin.settings.canvasRows = rows;
                console.log("Cols seted to " + rows);
            }
            return;
        }
        plugin.getCanvasRows = function() {                 return(plugin.settings.canvasRows); }





        // Canvas Public Methods
        // *********************

        plugin.draw = function() {
            var tile = new Image();
            tile.src = "_img/stroke_tile.png";

            c.clearRect (0, 0, canvas.width, canvas.height);

            for (var col = 0; col < 16; col++) {
                for (var row = 0; row < 16; row++) {
                    var tilePositionX = (row - col) * plugin.settings.tileHeight;

                    // Center Grid Horizontally
                    tilePositionX += (canvas.width /2) - (plugin.settings.tileWidth /2);

                    var tilePositionY = (row + col) * (plugin.settings.tileHeight /2);

                    c.drawImage(tile, Math.round(tilePositionX), Math.round(tilePositionY), plugin.settings.tileWidth, plugin.settings.tileHeight);
                } 
            }
        }            







        plugin.init();

    }

    $.fn.avaCanvas = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('avaCanvas')) {
                var plugin = new $.avaCanvas(this, options);
                $(this).data('avaCanvas', plugin);
            }
        });

    }

})(jQuery);