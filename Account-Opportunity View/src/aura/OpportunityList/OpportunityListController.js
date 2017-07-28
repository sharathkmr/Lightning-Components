({
	accRelatedOppor : function(component, event, helper) {
		var acc = event.getParam("acc");
        helper.getRelatedOpportunities(component, acc);
	},
    next : function(component, event, helper) {
     	var opportunityList = component.get("v.oppList");
        var end = component.get("v.end");
        var start = component.get("v.start");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
        
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++) {
             if(opportunityList.length > end) {
              	paginationList.push(opportunityList[i]);
                counter++ ;
             }
        }
        
        start = start + counter;
        end = end + counter;
        
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.paginationOppList', paginationOppList);
        console.log('oppList Length : '+opportunityList.length+' start: '+start+' end: '+end+'');
 	},
    previous : function(component, event, helper) {
     	var opportunityList = component.get("v.oppList");
        var end = component.get("v.end");
        var start = component.get("v.start");
        var pageSize = component.get("v.pageSize");
        var paginationList = [];
         
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++) {
             if(i > -1)  {
                 paginationList.push(opportunityList[i]);
                 counter ++;
             } else { 
                 start++; 
             }
        }
        start = start - counter;
        end = end - counter;
        
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.paginationOppList', paginationOppList);
        console.log('oppList Length : '+opportunityList.length+' start: '+start+' end: '+end+'');
 	},
    opporEvent : function(component, event, helper) {
        // returns the aura:id
        // to get the value attribute of the event source
        var oppId = event.getSource().get("v.value");
        helper.fireOpporEvent(oppId, component, event);
    }
})