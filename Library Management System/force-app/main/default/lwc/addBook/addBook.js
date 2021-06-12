import { LightningElement } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOK_OBJECT from '@salesforce/schema/Book__c';
import NAME_FIELD from '@salesforce/schema/Book__c.Book_Name__c';
import CATEGORY_FIELD from '@salesforce/schema/Book__c.Category__c';
import AUTHOR_FIELD from '@salesforce/schema/Book__c.Author__c';

export default class AddBook extends LightningElement {

    objectApiName = BOOK_OBJECT;
    fields = [NAME_FIELD, CATEGORY_FIELD, AUTHOR_FIELD];
    
    handleBookCreation(event) {
        const toastEvent = new ShowToastEvent({
            title: "Book Added Successfully",
            
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }
}