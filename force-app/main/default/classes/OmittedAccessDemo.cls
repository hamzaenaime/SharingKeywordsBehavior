// Base class with Omitted sharing behavior
public class OmittedAccessDemo {
    @AuraEnabled
    public static List<Opportunity> getRecords() {
        return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
    }

    // Static methods to instantiate and call inner classes
    @AuraEnabled
    public static List<Opportunity> getOmittedNestedRecords() {
        return new OmittedNested().getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getWithSharingNestedRecords() {
        return new WithSharingNested().getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getWithoutSharingNestedRecords() {
        return new WithoutSharingNested().getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getInheritedSharingNestedRecords() {
        return new InheritedSharingNested().getRecords();
    }

    // Static methods to instantiate and call other classes
    @AuraEnabled
    public static List<Opportunity> getRecordsParentOmittedChildOmitted() {
        return OmittedAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentOmittedChildWithSharing() {
        return WithSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentOmittedChildWithoutSharing() {
        return WithoutSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentOmittedChildInherited() {
        return InheritedAccessFlowDemo.getRecords();
    }
    
    // Nested class with Omitted sharing
    public class OmittedNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
    
    // Nested class with explicit with sharing
    public with sharing class WithSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
    
    // Nested class with without sharing
    public without sharing class WithoutSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
    
    // Nested class with inherited sharing
    public inherited sharing class InheritedSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
}