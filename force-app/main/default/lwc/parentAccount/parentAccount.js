import { LightningElement } from 'lwc';

export default class ParentAccount extends LightningElement {
    searchTextParent;

    handleEvent(event)
    {
        this.searchTextParent = event.detail;
    }
}