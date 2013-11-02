// ESTABLISHING GLOBAL VARIABLES
var Ava_CanvasContainer			= 'canvasContainer'			// DIV ID - A div from the HTML file where the canvas will be printed out (index.html) 
var Ava_CanvasFrame				= 'canvasFrame'				// DIV ID - From the canvas template file (canvas.html)
var Ava_CanvasStage				= 'canvasStage'				// DIV ID - From the canvas template file (canvas.html)

var uiContainer					= 'uiContainer'				// DIV ID - A div from the HTML file where the user interface will be printed out (index.html)

$( document ).ready(function() {

	// MODULES
	$.ajax({
		url: 		"_js/eventManager.js",
		dataType: 	"script",
		success: 	function() {
			Ava_EventManager = new AvaEventManager();					
		}
	})

	$.ajax({
		url: 		"_js/canvas.js",
		dataType: 	"script",
		success: 	function() {
			Ava_Canvas = new AvaCanvas();
			AvaStart();	
		}
	});		


	
	
	function AvaStart() {
		// OBJECT
		$.ajax({ 
			type: 		"GET", 
			url: 		"_templates/canvas.html", 
			async: 		false, 
			dataType: 	"html",
			cache: 		false,
			success: 	function(templateContent) { 

				$('#' + Ava_CanvasContainer).append(templateContent);		// load object into place
				Ava_objCanvas = new AvaObjCanvas();							// start loaded object

			}
		});

		// ISOMETRIC MAP DIALOG
		$.ajax({ 
			type: 		"GET", 
			url: 		"_templates/windowMap.html", 
			async: 		false, 
			dataType: 	"html",
			cache: 		false,
			success: 	function(templateContent) { 
				//$('#' + uiContainer).append(templateContent);
				//Ava_windowCanvas = new AvaWindowCanvas();
			} 
		});
		// CANVAS DIALOG
		$.ajax({ 
			type: 		"GET", 
			url: 		"_templates/windowCanvas.html", 
			async: 		false, 
			dataType: 	"html",
			cache: 		false,
			success: 	function(templateContent) { 
				$('#' + uiContainer).append(templateContent);
				Ava_windowCanvas = new AvaWindowCanvas();
			} 
		});





	}
	
});