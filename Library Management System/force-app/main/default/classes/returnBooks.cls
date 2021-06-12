public with sharing class returnBooks {
    @AuraEnabled(cacheable=true)
    public static List<Borrow_History__c> borrowedBooks(String user)
    {
        return[
            select id, Book__r.Book_Name__c, Issued_Date__c, Return_Date__c from Borrow_History__c where IsBorrowActive__c=true and User__c=:user


        ];
    }
}
