({
	updateRecordView: function(component, event, helper) {
        var id = component.get("v.id");
        var container = component.find("container");
        $A.createComponent("force:recordView",
                           {recordId: id},
                           function(cmp) {
                               container.set("v.body", [cmp]);
                           });
    }
})