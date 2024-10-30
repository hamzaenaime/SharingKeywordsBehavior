public with sharing class WithSharingAccessFlowDemo {
    @InvocableMethod(label='With Sharing Access Demo' 
                     description='Demonstrates with sharing behavior' 
                     category='Sharing Demos')
    public static List<List<Opportunity>> execute() {
        List<List<Opportunity>> results = new List<List<Opportunity>>();
        List<Opportunity> opportunities = getRecords();
        results.add(opportunities);
        return results;
    }

    public static List<Opportunity> getRecords() {
        return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
    }
}