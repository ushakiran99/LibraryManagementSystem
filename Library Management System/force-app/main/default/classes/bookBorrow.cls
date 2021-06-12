public with sharing class bookBorrow {
    @AuraEnabled(cacheable=true)
    public static void borrowedBooksList(List<Book__c> books)
    {
        List<Book__c> bookList =new List<Book__c>();
        for(Book__c b:books)
        {
            Book__c updateStatus= new Book__c();
            updateStatus.Id = b.Id;
            updateStatus.Status__c ='Borrowed';
            bookList.add(updateStatus);
       }
       update bookList;
    }
}
