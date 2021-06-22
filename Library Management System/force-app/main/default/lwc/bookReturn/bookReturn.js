import { LightningElement, track, wire} from 'lwc';
import {reduceErrors} from 'c/ldsUtils';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import UserId from '@salesforce/user/Id';
import borrowedBooks from '@salesforce/apex/returnBooks.borrowedBooks';
import returnBorrowedBooks from '@salesforce/apex/returnBooks.returnBorrowedBooks';

export default class BookReturn extends LightningElement {

     columns = [
        { label: 'Id', fieldName: 'Name', type: 'text' },
        { label: 'Book', fieldName: 'Book__r.Book_Name__c', type: 'lookup' },
        { label: 'Issue date',fieldName: 'Issued_Date__c', type: 'Date' },
        { label: 'Return date', fieldName: 'Return_Date__c', type: 'Date'},
    
     
    ];

    @track bookBorrowHistories;
    error;
    selectedBooks;
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



    getSelectedName(event){
        this.selectedBooks = event.target.selectedRows;
        console.log('Selected rows '+this.selectedBooks)
     }




    // return borrowed books

    handleReturnBook(){
       
            console.log('In return function' +this.selectedBooks)
        returnBorrowedBooks({returnedBooks: this.selectedBooks})
            .then((result) => {
                console.log(result);
               // refreshApex(this.bookBorrowHistories);

                //Dispatch Toaster Message
                this.error = undefined;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Book Returned Successfully',
                        variant: 'success'
                    })
                );

                
            })
            
            .catch((error) => {
                //Dispatch Error Toaster
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'No books to return',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });
    
          
    
    }
    

}