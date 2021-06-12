import { LightningElement, track } from 'lwc';

import getBookList from '@salesforce/apex/searchBook.getBookList';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class LibrarianBookSearch extends LightningElement {
    @track booksRecord;
  
 
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