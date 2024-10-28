public inherited sharing class InheritedAccessFlowDemo {
    @InvocableMethod(label='Inherited Sharing Access Demo' 
                     description='Demonstrates inherited sharing behavior' 
                     category='Sharing Demos')
    public static List<List<Opportunity>> execute() {
        List<List<Opportunity>> results = new List<List<Opportunity>>();
        List<Opportunity> opportunities = [SELECT Id, Name, StageName FROM Opportunity LIMIT 5];
        results.add(opportunities);
        return results;
    }
}