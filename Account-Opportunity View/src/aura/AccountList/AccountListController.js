({
    // funtion to handle the initialization when ever
    // the component loads
    // to get the acc list from server
	doInit : function(component, event, helper) {
        // create a server req
		var action = component.get("c.getAccounts");
        
        var pageSize = component.get("v.pageSize");
        
        // queuing the request at the server side
        // sending to the server on the next request cycle
        $A.enqueueAction(action);
        
        // setting call back function for what to do when reponse returns
            action.setCallback(this, function(response) {
                // handle the server response
                var state = response.getState();
                if(component.isValid() && state === 'SUCCESS') {
                    // set the component
                    component.set("v.accList", response.getReturnValue());
                    component.set("v.totalSize", component.get("v.accList").length);
                    component.set("v.start", 0);
                    component.set("v.end", pageSize-1);
                    
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
                    
                    component.set('v.paginationList', paginationList);
                 }
        	});  
    },
    accRelatedOpporEvent : function(component, event, helper) {
        // returns the aura:id
        // to get the value attribute of the event source
        var accId = event.getSource().get("v.value");
        helper.fireRelatedOpporEvent(accId, component, event);
    },
    next : function(component, event, helper) {
     	var accountList = component.get("v.accList");
        var end = component.get("v.end");
        var start = component.get("v.start");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
        
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++) {
             if(accountList.length > end) {
              	paginationList.push(accountList[i]);
                counter++ ;
             }
        }
        
        start = start + counter;
        end = end + counter;
        
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.paginationList', paginationList);
        console.log('accList Length : '+accountList.length+' start: '+start+' end: '+end+'');
 	},
    previous : function(component, event, helper) {
     	var accountList = component.get("v.accList");
        var end = component.get("v.end");
        var start = component.get("v.start");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
         
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++) {
             if(i > -1)  {
                 paginationList.push(accountList[i]);
                 counter ++;
             } else { 
                 start++; 
             }
        }
        start = start - counter;
        end = end - counter;
        
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.paginationList', paginationList);
        console.log('accList Length : '+accountList.length+' start: '+start+' end: '+end+'');
 	}
})