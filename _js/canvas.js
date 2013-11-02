var AvaCanvas = function(param, options) {
    var canvas;
    var c;

    var defaults = {
        minWidth:       768,
        minHeight:      384,
        canvasCols:     6,
        canvasRows:     12,
        tileWidth:      64,
        tileHeight:     32,
        canvasGrid:     1
    }

    var layer_0 = [];



    var plugin = this;
    plugin.settings = {}

    plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);
        console.log('[OBJ] AvaCanvas sucessfully started');
    }

    plugin.draw = function() {      
        // CANVAS STARTUP
        canvas  = document.getElementById(Ava_CanvasStage);
        c       = canvas.getContext('2d'); 
        c.clearRect (0, 0, canvas.width, canvas.height);



        // DEFAULT TILE TEMAPLTE
        var gridTile = {
            imageFile: "",
            attribute: 'empty'
        }

        if (plugin.settings.canvasGrid == 1) {
            gridTile.imageFile = "_img/stroke_tile.png";
        } else {
            gridTile.imageFile = "_img/nostroke_tile.png";
        }

        // CREATING  LAYER_0
        for (var i=0; i < plugin.settings.canvasCols; i++) {
            layer_0[i] = []
            for (var j=0; j < plugin.settings.canvasRows; j++) {
                layer_0[i][j] = gridTile;
            }
        }

        // DRAWING LAYER_0
        for (var col = 0; col < plugin.settings.canvasCols; col++) {
            for (var row = 0; row < plugin.settings.canvasRows; row++) {        
                var tile = new Image();
                tile.src = layer_0[col][row].imageFile

                var tilePositionX = (row - col) * plugin.settings.tileHeight;

                // Center Grid Horizontally
                tilePositionX += (canvas.width /2) - (plugin.settings.tileWidth /2);


                var tilePositionY = (row + col) * (plugin.settings.tileHeight /2);

                c.drawImage(tile, Math.round(tilePositionX), Math.round(tilePositionY), plugin.settings.tileWidth, plugin.settings.tileHeight);
            } 
        }
       

    }



    //SETTERS AND GETTERS
    plugin.setCanvasCols = function(cols) {
        if (cols) {
            plugin.settings.canvasCols = cols;
            console.log("Cols setted to " + cols);
        }
        return;
    }
    plugin.getCanvasCols = function() {                  
        return(plugin.settings.canvasCols); 
    }

    plugin.setCanvasRows = function(rows) {
        if (rows) {
            plugin.settings.canvasRows = rows;
            console.log("Cols seted to " + rows);
        }
        return;
    }
    
    plugin.getCanvasRows = function() {                 
        return(plugin.settings.canvasRows); 
    }

    plugin.setCanvasGrid = function(value) {
        if ( ( value == "0" ) || ( value == "1" ) ) {
            plugin.settings.canvasGrid = value;
            console.log("Canvas Grid setted to " + value);
        }
        return;
    }

    plugin.getCanvasGrid = function() {
        return(plugin.settings.canvasGrid);
    }





    plugin.init();
}
