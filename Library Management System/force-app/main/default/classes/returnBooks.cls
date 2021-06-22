public with sharing class returnBooks {
    @AuraEnabled(cacheable=true)
    public static List<Borrow_History__c> borrowedBooks(String user)
    {
        return[
            select Name, Book__r.Book_Name__c, Book__r.Status__c, Issued_Date__c, Return_Date__c from Borrow_History__c where IsBorrowActive__c=true and User__c=:user


        ];
    }


 @AuraEnabled
public static void returnBorrowedBooks(List<String> returnedBooks){
    
    
    try{
        List<Borrow_History__c> booksToReturn=[select id,Book__r.Book_Name__c, Book__r.Status__c, Issued_Date__c, Return_Date__c from Borrow_History__c where Id in :returnedBooks];
        System.debug(booksToReturn);
        
        

        List<Book__c> parentBook = [select id, Status__c from Book__c where Id in (select Book__c from Borrow_History__c where id in:returnedBooks )];

        List<Book__c> updateList = new List<Book__c>();

        List<Borrow_History__c> updateListOfBooks= new List<Borrow_History__c>();

        for(Book__c book:parentBook)
        {
            book.Status__c='Available';
            updateList.add(book);

        }
         
        update updateList;
        
        for(Borrow_History__c b: booksToReturn){
            system.debug('In for loop');
            Borrow_History__c bookHistory= new Borrow_History__c();
            //To update Book Status
            
            bookHistory.Id = b.Id;
           
           // bookHistory.Book__r.Status__c = 'Available';
            bookHistory.IsBorrowActive__c=false;
            updateListOfBooks.add(bookHistory);
            System.debug('Book history to be updated ' + bookHistory.Id);
           
           
        }
        
            update updateListOfBooks;
        
       
        }
           catch(Exception e){
            throw e;
        }
        
}


}
