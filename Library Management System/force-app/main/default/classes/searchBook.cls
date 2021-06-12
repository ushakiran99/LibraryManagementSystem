public with sharing class searchBook {
    @AuraEnabled
    public static list<Book__c> getBookList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
        // create book list to store search result 
       // list<Book__c> bookListRecord = new list<Book__c>();
     
	   // query book records
       List<Book__c> bookListRecord= [Select id, Book_Name__c, Status__c, (select Member_ID__c from Borrow_Histories__r )
                            From Book__c
                            WHERE Book_Name__c LIKE :searchKeyword];
                                
        
        
         if(bookListRecord.size() == 0){
            throw new AuraHandledException('No Books Found..'); 
         }
         
        return bookListRecord;
}
}
