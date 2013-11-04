function avaLoadManager(options) {
	var defaults = {}

	var plugin 				= this;
	plugin.settings 		= {}

	var queue 				= [];


	plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);
        console.log('[LoadManager] Success: Started');
    }

    plugin.queue = function(objId, fileUrl, dataType, callback){
    	resource = {
    		objId: objId,
    		fileUrl: fileUrl,
    		dataType: dataType,
    		callback: callback
    	}

    	if (queue.length == 0) {
    		addtoQueue(resource);
    		return;
    	}

    	for (var i=0; i < queue.length; i++ ) {
    		if (queue[i].objId == objId) {
		    	console.log('[LoadManager] Error: Object '+resource.objId+' is already on the queue.')
    		} else {
    			addtoQueue(resource);
    		}
    	}

    	function addtoQueue(obj) {
	    	queue.push(obj);
	    	console.log('[LoadManager] Success: Object '+resource.objId+' was added to the queue.')
    	}
    }



    plugin.deQueue = function(objId) {
    	
    }

    plugin.run = function(){
    	if (queue.length > 0) {
    		object = queue[0];

			$.ajax({
				url: 			object.fileUrl,
				dataType: 		object.dataType,
				objFunction: 	object.callback,
				objId: 			object.objId,
				success: 	function(dataResponse) {
					
					if (object.dataType == 'html') {
						this.objFunction.call(undefined, dataResponse);
					} else {
						this.objFunction.call();
					}
					
					console.log('[LoadManager] Loaded: Object '+this.objId);
					queue.splice(0,1);
					plugin.run();

				}, error: function(data) {
					console.log('[LoadManager] Error: Could not load Object '+this.objId);
					console.log('[LoadManager] Message: ' + data);
				}
			});    		

    	} else {
    		console.log('[LoadManager] Nothing to load, queue is empty.')
    		return;
    	}
    }

    plugin.init();

}

