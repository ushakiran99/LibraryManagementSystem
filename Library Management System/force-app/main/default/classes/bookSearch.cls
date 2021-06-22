public with sharing class bookSearch {
   
    @AuraEnabled
    public static list<Book__c> getBookList(String searchValue, String searchType) {
                         

        
                  try{
                      String query= 'SELECT id,Book_Name__c, Status__c,Category__c,Author__c,(select Return_Date__c from Borrow_Histories__r) FROM Book__c where ' +searchType+' '+'Like'+'\'' +'%'+searchValue+'%'+'\'';
                      List<Book__c> listOfBooks= Database.query(query);
                      return listOfBooks;
                  }     
        catch(Exception e)
        {
            throw e;
        }
        
       
         
        
}


@AuraEnabled
public static void borrowBooks(List<Book__c> books, Id currentUser){
    try{
        System.debug('Current User : ' + currentUser);
        List<Book__c> updateBooks = new List<Book__c>();
        List<Borrow_History__c> bookBorrowInfos = new List<Borrow_History__c>();
        for(Book__c b: books){
            
            //To update Book Status
            Book__c updateBook = new Book__c();
            updateBook.Id = b.Id;
            updateBook.Status__c = 'Borrowed';
            updateBooks.add(updateBook);
            System.debug('Book to be updated ' + updateBook.Id);
           
            //After Click on Borrow Button....It will create 'Book Borrow Info' Record
            Borrow_History__c bookBorrowInfo = new Borrow_History__c();
            bookBorrowInfo.Book__c = b.Id;
            bookBorrowInfo.User__c = currentUser;
            bookBorrowInfo.Issued_Date__c = Date.today();
           
            bookBorrowInfo.IsBorrowActive__c = true;
            bookBorrowInfos.add(bookBorrowInfo);
        
    }
        update updateBooks;
        insert bookBorrowInfos;
        }
           catch(Exception e){
            throw e;
        }
        
}
}