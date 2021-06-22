import { LightningElement, track } from 'lwc';
import getBookList from '@salesforce/apex/bookSearch.getBookList';
import borrowBooks from '@salesforce/apex/bookSearch.borrowBooks';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Id from '@salesforce/user/Id';
//import { refreshApex } from '@salesforce/apex';
 
export default class SearchBook extends LightningElement {
    @track listOfBooks;
   // @track preparedAssets;
    searchValue;
    @track withreturnData;
    searchType='Book_Name__c';
    selectedBooks;
    error;
 
    //Fields That will show in Search Books Table
    columns = [
        { label: 'Id', fieldName: 'Id'},
        { label: 'Name', fieldName: 'bookName', type: 'text'},
        { label: 'Author', fieldName: 'author', type: 'text'},
        { label: 'Category', fieldName: 'category', type: 'picklist'},
        { label: 'Status', fieldName: 'status', type: 'picklist'},
        { label: 'Return Date', fieldName: 'returnDate', type: 'text'},
    
        
    ];
 
    //Radio Buttons Display Options
    get options() {
        return [
            { label: 'Id', value: 'Name' },
            { label: 'Name', value: 'Book_Name__c' },
            { label: 'Author', value: 'Author__c' },
            { label: 'Category', value: 'Category__c' }
        ];
    }
 
    handleRadioChange(event){
        this.searchType = event.detail.value;
    }
 
    //On change in the Search Text, It will capture latest Search Value
    searchKeyword(event){
        this.searchValue = event.target.value;
    }
 
    //On click of Search Button Book Data will show
    handleSearchBook(){
        console.log('Search Value ' + this.searchValue);
        console.log('Search Type ' + this.searchType);
        //Call Apex method imperatively
        getBookList({searchType: this.searchType, searchValue : this.searchValue})
            .then(result => {
                console.log(result);
                this.listOfBooks = result;

                this.listofBooksBorrowed=result;
                let preparedAssets = [];
               //let i=0;
                this.listofBooksBorrowed.forEach(asset => {
                    let preparedAsset={};
                    
                    preparedAsset.Id=asset.Id;
                    
                    preparedAsset.bookName=asset.Book_Name__c;
                    console.log('Book Name: '+asset.Book_Name__c)
                    preparedAsset.author=asset.Author__c;
                    console.log('Author Name ' +asset.Author__c)
                    preparedAsset.category=asset.Category__c;
                    preparedAsset.status=asset.Status__c;
                    console.log('Status'+asset.Status__c);

                  if(asset.Status__c=='Borrowed'){
                    console.log('Return Date '+asset.Borrow_Histories__r[0].Return_Date__c);
                    preparedAsset.returnDate=asset.Borrow_Histories__r[0].Return_Date__c;

                  }
                   
                   
                    preparedAssets.push(preparedAsset);
                });
                this.withreturnData=preparedAssets;
                //this.Books=result;
                //this.returnDate=this.listOfBooks.Borrow_Histories__r.Return_Date__c;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.listOfBooks = undefined;
            });
    }
 
    //On Selection of a book from Search Table
     getSelectedName(event){
        this.selectedBooks = event.detail.selectedRows;
        
        
     }


    // trying to filer the books which are borrowed
    


 //On click of Borrow Button Book Status will Update to 'Borrowed'
 handleBorrowBook(){
    console.log('Current User Id is : ' + Id);
        
    
    borrowBooks({books: this.selectedBooks, currentUser: Id})
        .then((result) => {
            console.log(result);
            
            
           
            
            //Dispatch Toaster Message
            this.error = undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Book Borrowed Successfully',
                    variant: 'success'
                })
            );
            //Refresh Status Field to 'Borrowed' after clicking on Borrow Button 
            console.log('trying to refresh the page...')
            this.handleSearchBook();
        })
        
        .catch((error) => {
            //Dispatch Error Toaster
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Cannot borrow the book',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                })
            );
        });

      

}

    
    }
    
    


