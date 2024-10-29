// Base class with default sharing behavior
public class DefaultAccessDemo {
    @AuraEnabled
    public static List<Opportunity> getRecords() {
        return [SELECT Id, Name, StageName FROM Opportunity LIMIT 5];
    }

    // Static methods to instantiate and call inner classes
    @AuraEnabled
    public static List<Opportunity> getDefaultNestedRecords() {
        return new DefaultNested().getRecords();
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
    public static List<Opportunity> getRecordsParentDefaultChildDefault() {
        return DefaultAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentDefaultChildWithSharing() {
        return WithSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentDefaultChildWithoutSharing() {
        return WithoutSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentDefaultChildInherited() {
        return InheritedAccessFlowDemo.getRecords();
    }
    
    // Nested class with default sharing
    public class DefaultNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName FROM Opportunity LIMIT 5];
        }
    }
    
    // Nested class with explicit with sharing
    public with sharing class WithSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName FROM Opportunity LIMIT 5];
        }
    }
    
    // Nested class with without sharing
    public without sharing class WithoutSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName FROM Opportunity LIMIT 5];
        }
    }
    
    // Nested class with inherited sharing
    public inherited sharing class InheritedSharingNested {
        @AuraEnabled
        public List<Opportunity> getRecords() {
            return [SELECT Id, Name, StageName FROM Opportunity LIMIT 5];
        }
    }
}