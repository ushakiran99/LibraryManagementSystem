import { LightningElement,wire, track} from 'lwc';
import { refreshApex } from '@salesforce/apex';

import getBorrowHistory from '@salesforce/apex/BorrowHistoryClass.getBorrowHistory';
import UserId from '@salesforce/user/Id';
const COLUMNS = [
    { label: 'Id', fieldName: 'Name', type: 'text' },
    { label: 'User', fieldName: 'User__r.Name', type: 'lookup' },
    { label: 'Issue date',fieldName: 'Issued_Date__c', type: 'Date' },
    { label: 'Return date', fieldName: 'Return_Date__c', type: 'Date'},
    { label: 'Book', fieldName: 'Book__r.Book_Name__c', type: 'lookup' },
    { label: 'Status', fieldName: 'Book__r.Status__c', type: 'picklist' }

 
];

export default class BorrowHistory extends LightningElement {

   
    @track bookBorrowHistories;
    columns=COLUMNS;
    userDetails=UserId;
    @wire(getBorrowHistory, {user: '$userDetails'})
    
    wiredActivities({ error, data }) {
        if (data) 
        {
           this.bookBorrowHistories =  data.map(
            record => Object.assign(
                {   "Book__r.Book_Name__c": record.Book__r.Book_Name__c, 
                    "User__r.Name": record.User__r.Name,
                    "Book__r.Status__c": record.Book__r.Status__c
                },record
            ));
           
        }
        else if (error) {
             this.error = error;
             this.bookBorrowHistories = undefined;
        }
        refreshApex(this.bookBorrowHistories);
    }
  
  
  
  
    // bookhistories;
//    wiredAssets(error, data) {
//     this.data = data;;
//     if (this.data) {
//         let preparedAssets = [];
//         this.data.forEach(asset => {
//             let preparedAsset = {};
//             preparedAsset.borrowId = asset.Id;
//             preparedAsset.bookName = asset.Book__r.Book_Name__c;
//             preparedAsset.userName = asset.User__r.Name;
//             preparedAsset.issuedDate = asset.Issued_Date__c;
//             preparedAsset.returnDate = asset.Return_Date__c;
//             preparedAsset.isBorrowed = asset.IsBorrowActive__c;
            

//             preparedAssets.push(preparedAsset);
//         });
//         this.data = preparedAssets;
//     }
    
//     else if (error) {
//         this.error = error;
//         this.data = undefined;
//      }

//    }

}