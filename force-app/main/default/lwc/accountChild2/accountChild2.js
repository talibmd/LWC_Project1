import { api, LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/Accountclass.getAccounts';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class AccountChild2 extends LightningElement {
    @api
    searchTextChild2;

    @wire(CurrentPageReference)
    pageRef;

    columns=[
        { label : 'ID', fieldName : 'Id' },
        { label : 'Name', fieldName : 'Name' },
        { label : 'Actions', fieldName : 'Actions' ,type:'button', typeAttributes:{ label : 'View Contacts', value : 'view_contacts'}}
        ];
    /*
        //Demo dataSet for lightning-datatable

    rows=[
        { ID : '123', Name : 'Talib', Actions : 'Run'},
        { ID : '124', Name : 'Xanli', Actions : 'Run'},
        { ID : '125', Name : 'Hyder', Actions : 'Run'}
    ];   

    */
    @wire(getAccounts,{searchToken : '$searchTextChild2'})
    accountRecords;
    

    currentId;
    currentName;
    handleRowAction(event)
    {
        if(event.detail.action.value='view_contacts')
        {
            this.currentId=event.detail.row.Id;  //this can be improved-@1
            this.currentName = event.detail.row.Name;//this can be improved-@1
            
            const payload=
            {
                Id: this.currentId, //this can be improved -@1
                Name: this.currentName   //this can be improved -@1
            };
            fireEvent(this.pageRef, 'project1Publisher',payload);
        } 
    }
    
    
}