({
	fireRelatedOpporEvent : function(accId, component, event) {
		// get the account attribute set the id
        var acc = component.get("v.acc");
        acc.Id = accId;
        // getting the event if event is a component-level event
        // var relatedOpporEvent = component.getEvent("AccRelatedOppor");
        // getting the event if event is a application-level event
      	var relatedOpporEvent = $A.get("e.c:AccountRelatedOpporEvent");
        // set the parameters
        relatedOpporEvent.setParams({ "acc": accId });
        // fire the event
        relatedOpporEvent.fire();
	}
})