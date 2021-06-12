import { LightningElement, track } from 'lwc';
import getBookList from '@salesforce/apex/searchById.getBookList';


export default class SearchById extends LightningElement {
    @track booksRecord;
   @track withreturnData

    columns = [
        { label: 'User Name', fieldName: 'userName', type: 'text'},
        { label: 'Book Name', fieldName: 'bookName', type: 'text'},
        { label: 'Status', fieldName: 'status', type: 'picklist'},
        { label: 'Return Date', fieldName: 'returnDate', type: 'date'},
    
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
                    
                    preparedAsset.userName=asset.User__r.Name;
                    console.log('User Name: '+asset.User__r.Name)

                    preparedAsset.bookName=asset.Book__r.Book_Name__c;
                    console.log('Book Name ' +asset.Book__r.Book_Name__c)

                    preparedAsset.status=asset.Book__r.Status__c;
                    console.log('Status '+ asset.Book__r.Status__c)

                    preparedAsset.returnDate=asset.Return_Date__c;
                    console.log('Return Date'+asset.Return_Date__c);
                   
                   
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