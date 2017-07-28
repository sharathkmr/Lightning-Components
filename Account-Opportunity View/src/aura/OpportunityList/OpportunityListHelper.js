({
	getRelatedOpportunities : function(component, acc) {
		// calling the server side controller method which is aura enabled
        var action = component.get("c.getOpportunities");
        
        var pageSize = component.get("v.pageSize");
        	
        // setting the paramters to pass the object from client to server side
        // the parameter name should be same as which we used in server controller
        // the parameter in server side is nothing but the method arguments
        action.setParams({
            "acc": acc
        });
        
        // setting oppList object to intitial value
        // setting call back function for what to do when reponse returns
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                // copy the opportunities to list in component
                component.set("v.oppList", response.getReturnValue());
                component.set("v.totalSize", component.get("v.oppList").length);
                component.set("v.start",0);
                component.set("v.end",pageSize-1);
                    
                var paginationList = [];
                // if totalsize of the database queried list is less than page size
                // then assigning the total size to page size
                if(pageSize > component.get("v.totalSize")) {
                    pageSize = component.get("v.totalSize");
                    component.set("v.pageSize",pageSize);
                } 
                for(var i=0; i< pageSize; i++) {
                 	paginationList.push(response.getReturnValue()[i]);    
        		}
                    
                component.set('v.paginationOppList', paginationList);
            }
        });
            
        // queuing the request at the server side
        // sending to the server on the next request cycle
        $A.enqueueAction(action);
	},
    fireOpporEvent : function(oppId, component, event) {
    	// getting the event if event is a component-level event
      	//  getting the event if event is a application-level event
      	var OpporEvent = $A.get("e.c:OpporRecordViewEvent");
        
        // set the parameters
        OpporEvent.setParams({ "id": oppId });
        
        // fire the event
        OpporEvent.fire();
	}
})