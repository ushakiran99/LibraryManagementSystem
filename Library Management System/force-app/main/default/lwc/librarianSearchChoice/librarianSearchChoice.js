import { LightningElement, track } from 'lwc';

export default class LibrarianSearchChoice extends LightningElement {

    @track showSearchComponent = false;
    @track bookSearchComponent = true;

    callSearchById()
    {
        this.showSearchComponent = true;
        this.bookSearchComponent = false;
    }

    callSearchByBook()
    {
        this.showSearchComponent = false;
        this.bookSearchComponent = true;
    }
}