trigger bookStatusTrigger on Book__c (before insert) {

    for(Book__c book:Trigger.new)
    {
        book.Status__c='Available';
    }

}