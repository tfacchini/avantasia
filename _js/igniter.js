// ESTABLISHING GLOBAL VARIABLES
var Ava_CanvasContainer			= 'canvasContainer'			// DIV ID - A div from the HTML file where the canvas will be printed out (index.html) 
var Ava_CanvasFrame				= 'canvasFrame'				// DIV ID - From the canvas template file (canvas.html)
var Ava_CanvasStage				= 'canvasStage'				// DIV ID - From the canvas template file (canvas.html)

var uiContainer					= 'uiContainer'				// DIV ID - A div from the HTML file where the user interface will be printed out (index.html)

$( document ).ready(function() {

	// LOAD MANAGER
	$.ajax({
		url: 		"_js/loadManager.js",
		dataType: 	"script",
		success: 	function() {
			Ava_LoadManager = new avaLoadManager();	

			// ALL OBJECT, RESOURCES, CONTROLLERS, TEMPLATES -M-U-S-T- USE LOAD MANAGER
			// Ava_LoadManager.queue('referenceId', 'fileUrl', 'dataType(script / html)', callback);
			
			// MODULE - EVENT MANAGER
			Ava_LoadManager.queue('Ava_EventManager', "_js/eventManager.js", 'script', function() { 
				Ava_EventManager = new AvaEventManager();
			});

			// MODULE - CANVAS
			Ava_LoadManager.queue('Ava_Canvas', '_js/canvas.js', 'script', function() {
				Ava_Canvas = new AvaCanvas();
				AvaStart();	
			});

			// OBJECT - CANVAS
			Ava_LoadManager.queue('Ava_objCanvas', '_templates/canvas.html', 'html', function(dataResponse) {
				$('#' + Ava_CanvasContainer).append(dataResponse);			// load object into place
				Ava_objCanvas = new AvaObjCanvas();							// start loaded object
			});


			Ava_LoadManager.run();
		}
	});


	// MODULES		
	
	
	function AvaStart() {
		// OBJECT


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