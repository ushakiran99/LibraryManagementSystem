public with sharing class BorrowHistoryClass {
    @AuraEnabled(cacheable=true)
    public static List<Borrow_History__c> getBorrowHistory( String user) {
       
        return [
            SELECT  Name, Book__r.Book_Name__c, Book_Status__c, User__r.Name, Issued_Date__c, Return_Date__c
            FROM Borrow_History__c  where User__c =:user

            WITH SECURITY_ENFORCED
            LIMIT 20
       ];
    }
}