public with sharing class searchById {
    
    @AuraEnabled
    public static list<Borrow_History__c> getBookList(String searchKey) {
        //string searchKeyword = searchKey;
        // create book list to store search result 
       // list<Books__c> bookListRecord = new list<Books__c>();
     
	   // query book records
       List<Borrow_History__c> bookListRecord= [Select id,User__r.Name, Book__r.Name, Book__r.Status__c, Return_Date__c
       From Borrow_History__c
       WHERE Member_ID__c = :searchKey];
                                
        
        
         if(bookListRecord.size() == 0){
            throw new AuraHandledException('No Member Found..'); 
         }
         
        return bookListRecord;
}
}
