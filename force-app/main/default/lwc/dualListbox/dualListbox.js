import { LightningElement } from 'lwc';

export default class DualListbox extends LightningElement {
    listOptions=
    [
        {
            value : '1',
            label : 'Option 1'
        },
        {
            value : '2',
            label : 'Option 2'
        },
        {
            value : '3',
            label : 'Option 3'
        },
        {
            value : '4',
            label : 'Option 4'
        },
        {
            value : '5',
            label : 'Option 5'
        },
        {
            value : '6',
            label : 'Option 6'
        }

    ];
    defaultOptions = ['5','3'];
    requiredOptions = ['2','4'];

    handleChange(event)
    {
        const selectedOptionsList = event.detail.value;
    }
}