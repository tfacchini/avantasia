function AvaEventManager(options) {

	var defaults = {}

	var plugin 				= this;
	plugin.settings 		= {}
	var objList 			= []


	plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);
        console.log('[EventManager] Success: Started');
    }



    plugin.registerEvent = function(object, eventType) {

    	objList[object] = eventType;


    	// Inject Triggers inside object public events
    	for(var eventType in eventType) {
    		$("#"+object).bind(eventType, { object : object, eventType: eventType }, function(event) {
    			Ava_EventManager.fireEvent(event.data.object, event.data.eventType); 
    		})
    	}

    }





    plugin.fireEvent = function(object, event) {
        if (objList[object]) {                                                                                                                  // Check if the object is registered inside Event Manager
            if (objList[object][event]) {    
    	       functionQueue = objList[object][event];
        
                for (i=0; i < functionQueue.length; i++) {
                    callbackFunction = functionQueue[i].function;
                    callbackFunction.call();
                }
            }
        }
    }





    plugin.registerFunction = function(object, event, eventFunction) {
                                                                                                                                                     // Before register function, we need to search if the function id given is already registered
		if (objList[object]) {                                                                                                                  // Check if the object is registered inside Event Manager
			if (objList[object][event]) {                                                                                                       // Check if the event is registered inside object
				eventList = objList[object][event];
                
                for (i = 0; i < eventList.length; i++ ) {                                                                                       // Check if the function ID is registered into the object-event-function list
                    if (eventFunction.id == eventList[i].id) {
                        console.log('[EventManager] Error: Function ID is already registered into ' + object + "-" + event);
                        return;                                                                                                                 // Cancel registration if the function ID is already registered
                    }
                }

                eventList.push(eventFunction);                                                                                                  // Insert the function into object-event
                console.log('[EventManager] Success: The function('+eventFunction.id+') was sucessfully registered into '+object+'.'+event);
			} else {
				console.log('[EventManager] Error: There is no event(' + event + ') registered to object(' + object + ')');
                return;
			}
		} else {
			console.log('[EventManager] Error: There is no object(' + object + ') registered on Event Manager');
            return;
		}
    }





    plugin.unRegisterFunction = function(object, event, functionId) {
        
        if (objList[object]) {    
            if (objList[object][event]) {
                functionQueue = objList[object][event];
                
                for (i=0; i < functionQueue.length; i++) {
                    if (functionQueue[i].id == functionId) {
                       functionQueue.splice(i,1);
                       console.log('[EventManager] Success: Function(' + functionId + ') was sucessfuly unregistered from ' + object + '.' + event);
                       return;
                    }
                } 
                console.log('[EventManager] Error: There is no function(' + functionId + ') registered to ' + object + '.' + event);    

            } else {
                console.log('[EventManager] Error: There is no event(' + event + ') registered to object(' + object + ')');
                return;
            }
        } else {
            console.log('[EventManager] Error: There is no object(' + object + ') registered on Event Manager');
            return;
        }
    }





    plugin.init();

}




