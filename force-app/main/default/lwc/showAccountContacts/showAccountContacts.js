import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener } from 'c/pubsub';
import getAccountContacts from '@salesforce/apex/Accountclass.getAccountContacts';
import LightningConfirm from 'lightning/confirm';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class ShowAccountContacts extends LightningElement {
    receivedId;
    receivedName;

    @wire(CurrentPageReference)
    pageRef;

    
    ConTitle='Contacts';

    conList;  
    conListFlag;

    isAccountselected=false;

    isAddContactButtonClicked=false;

    isEditContactButton=false;

   
    editableContactId;
    toDeleteContactId;

    @api recordId;
    
    connectedCallback()
    {
        registerListener('project1Publisher',this.handlePublishedData, this);
    }

    handlePublishedData(data)
    {
        //this.ConTitle=this.receivedName+'\'s Contacts';(kaise use karega jb value assign hi ni hua abhi tak isko)
        this.receivedId=data.Id;
        this.receivedName=data.Name;
        this.ConTitle=this.receivedName+'\'s Contacts';
        //console.log('going to call async menthod'); //works fine
        this.getContacts();
        this.isAccountSelected=true;
    }

    async getContacts()
    {
        //console.log('async method called');//works fine
        //console.log(this.receivedId);
        this.conList= await getAccountContacts({acId: this.receivedId});
        //console.log('passed id to apex class'); works fine

        if(this.conList.length>0)
        {
            this.conListFlag=true;
            
        }
        else{
            this.conListFlag=false;
        }
    }

    handleAddContact(event)
    {
        this.isAddContactButtonClicked=true;
    }

    
    handleAddContactCancel(event)
    {
        this.isAddContactButtonClicked=false;
    }

    handleEditContactCancel(edit)
    {
        this.isEditContactButton=false;
    }

    handleEditContactButton(event)
    {
        this.isEditContactButton=true;
       // console.log(this.event.target.dataset.conId);
       this.editableContactId=event.target.dataset.contactId;
        //console.log(this.event.target.dataset.conId); 
    }

    handleAddContactSuccess(event)
    {
        this.isAddContactButtonClicked=false;     
        this.getContacts();
    }
    handleEditContactSuccess(event)
    {
        this.isEditContactButton=false;
        this.getContacts();
    }

     async handleDelete(event)
        {
        //code for adding confirmation window.
            this.toDeleteContactId=event.target.dataset.contactId;
            const result = await LightningConfirm.open({
                message: 'Are you sure you want to Delete',
                variant: 'headerless',
                label: 'Delete Confirmation',
                // setting theme would have no effect
            });
            //Confirm has been closed
            //result is true if OK was clicked
            //and false if cancel was clicked
            if(result)
            {  
                let deletedResult= await deleteRecord(this.toDeleteContactId);               
                this.getContacts();
                this.showToast();
                
            }
        }
        showToast() 
            {
                const event = new ShowToastEvent({
                    title: 'Contact Deleted',
                    message:
                        'Contact Deleted Successfully',
                }); 
                this.dispatchEvent(event);
            }
    
}