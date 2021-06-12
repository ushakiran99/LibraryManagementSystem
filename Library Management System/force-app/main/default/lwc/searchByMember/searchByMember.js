import { LightningElement,track } from 'lwc';

import getBookList from '@salesforce/apex/searchBook.getBookList';

export default class SearchByMember extends LightningElement {
    @track booksRecord;
    @track withreturnData
 
     columns = [
         { label: 'Book Name', fieldName: 'bookName', type: 'text'},
         { label: 'Status', fieldName: 'status', type: 'picklist'},
         { label: 'Member Id', fieldName: 'memberId', type: 'text'},
     
     ];
   
  
     // update searchValue var when input field value change
     searchKeyword(event) {
         this.searchValue = event.target.value;
     }
  
     // call apex method on button click 
     handleSearchKeyword() {
         
         if (this.searchValue !== '') {
             console.log('In search value loop')
             getBookList({
                 
                 
                     searchKey: this.searchValue
                 })
                 .then(result => {
                     console.log('Getting result')
                     // set @track contacts variable with return contact list from server  
                     this.booksRecord = result;
                     this.listofBooks=result;
                 let preparedAssets = [];
                //let i=0;
                 this.listofBooks.forEach(asset => {
                     let preparedAsset={};
                     
                     //preparedAsset.Id=asset.Id;
                     
 
                     preparedAsset.bookName=asset.Book_Name__c;
                     console.log('Book Name ' +asset.Book_Name__c)
 
                     preparedAsset.status=asset.Status__c;
                     console.log('Status '+ asset.Status__c)
 
                     if(asset.Status__c=='Borrowed'){
                     preparedAsset.memberId=asset.Borrow_Histories__r[0].Member_ID__c;
                     console.log('Member ID '+asset.Borrow_Histories__r[0].Member_ID__c)
                     }
                    
                     preparedAssets.push(preparedAsset);
                 });
                 this.withreturnData=preparedAssets;
                 })
                 .catch(error => {
                    
                     const event = new ShowToastEvent({
                         title: 'Error',
                         variant: 'error',
                         message: error.body.message,
                     });
                     this.dispatchEvent(event);
                     // reset books var with null   
                     this.booksRecord = null;
                 });
         } else {
             // fire toast event if input field is blank
             const event = new ShowToastEvent({
                 variant: 'error',
                 message: 'Search text missing..',
             });
             this.dispatchEvent(event);
         }
     }
}