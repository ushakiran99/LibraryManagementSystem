import { LightningElement, track, wire} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import UserId from '@salesforce/user/Id';
import borrowedBooks from '@salesforce/apex/returnBooks.borrowedBooks';

export default class BookReturn extends LightningElement {

     columns = [
        { label: 'Id', fieldName: 'Id', type: 'text' },
        { label: 'Book', fieldName: 'Book__r.Book_Name__c', type: 'lookup' },
        { label: 'Issue date',fieldName: 'Issued_Date__c', type: 'Date' },
        { label: 'Return date', fieldName: 'Return_Date__c', type: 'Date'},
    
     
    ];

    @track bookBorrowHistories;
    userDetails=UserId;
    @wire(borrowedBooks, {user: '$userDetails'})
    
    wiredActivities({ error, data }) {
        if (data) 
        {
           this.bookBorrowHistories =  data.map(
            record => Object.assign(
                {   "Book__r.Book_Name__c": record.Book__r.Book_Name__c, 
                },record
            ));
            console.log(this.bookBorrowHistories);
           
        }
        else if (error) {
             this.error = error;
             this.bookBorrowHistories = undefined;
        }
        refreshApex(this.bookBorrowHistories);
    }


}