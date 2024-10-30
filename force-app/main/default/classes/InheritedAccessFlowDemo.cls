public inherited sharing class InheritedAccessFlowDemo {
    @InvocableMethod(label='Inherited Sharing Access Demo' 
                     description='Demonstrates inherited sharing behavior' 
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