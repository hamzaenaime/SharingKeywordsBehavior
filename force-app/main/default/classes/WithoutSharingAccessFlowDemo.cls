public without sharing class WithoutSharingAccessFlowDemo {
    @InvocableMethod(label='Without Sharing Access Demo' 
                     description='Demonstrates without sharing behavior' 
                     category='Sharing Demos')
    public static List<List<Opportunity>> execute() {
        List<List<Opportunity>> results = new List<List<Opportunity>>();
        List<Opportunity> opportunities = [SELECT Id, Name, StageName FROM Opportunity LIMIT 5];
        results.add(opportunities);
        return results;
    }
}