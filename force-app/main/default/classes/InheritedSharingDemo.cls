// Base class with inherited sharing
public inherited sharing class InheritedSharingDemo {
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
    public static List<Opportunity> getRecordsParentInheritedChildOmitted() {
        return OmittedAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentInheritedChildWithSharing() {
        return WithSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentInheritedChildWithoutSharing() {
        return WithoutSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentInheritedChildInherited() {
        return InheritedAccessFlowDemo.getRecords();
    }
    
    public class OmittedNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
    
    public with sharing class WithSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
    
    public without sharing class WithoutSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
    
    public inherited sharing class InheritedSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
        }
    }
}