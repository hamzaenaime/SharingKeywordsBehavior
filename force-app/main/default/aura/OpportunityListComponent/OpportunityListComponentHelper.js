({
    fetchOpportunities: function(component) {
        const action = component.get("c.getRecords");
        console.log('## action: ',action);
        try {
            action.setCallback(this, function(response) {
                const state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.opportunities", response.getReturnValue());
                    console.log('## opportunities: ', response.getReturnValue());
    
                    // Define columns for the datatable
                    component.set("v.columns", [
                        { label: "Opportunity Name", fieldName: "Name", type: "text" },
                        { label: "Stage", fieldName: "StageName", type: "text" },
                        { label: "Type", fieldName: "Type", type: "text" }
                    ]);
                } else {
                    console.error("Failed with state: " + state);
                }
            });
            
            $A.enqueueAction(action);
        } catch (error) {
            console.log("## error ",error);
        }

    }
})
