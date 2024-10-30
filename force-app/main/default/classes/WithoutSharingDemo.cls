// Base class with without sharing
public without sharing class WithoutSharingDemo {
    @AuraEnabled
    public static List<Opportunity> getRecords() {
        return [SELECT Id, Name, StageName, Type FROM Opportunity LIMIT 5];
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
    public static List<Opportunity> getRecordsParentWithoutSharingChildDefault() {
        return DefaultAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentWithoutSharingChildWithSharing() {
        return WithSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentWithoutSharingChildWithoutSharing() {
        return WithoutSharingAccessFlowDemo.getRecords();
    }
    
    @AuraEnabled
    public static List<Opportunity> getRecordsParentWithoutSharingChildInherited() {
        return InheritedAccessFlowDemo.getRecords();
    }
    
    public class DefaultNested {
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

