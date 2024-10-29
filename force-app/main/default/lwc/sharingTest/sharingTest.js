// sharingTest.js
import { LightningElement, track } from 'lwc';
// Default Access Demo methods
import getRecordsDefault from '@salesforce/apex/DefaultAccessDemo.getRecords';
import getRecordsDefaultNested from '@salesforce/apex/DefaultAccessDemo.getDefaultNestedRecords';
import getRecordsDefaultWithSharing from '@salesforce/apex/DefaultAccessDemo.getWithSharingNestedRecords';
import getRecordsDefaultWithoutSharing from '@salesforce/apex/DefaultAccessDemo.getWithoutSharingNestedRecords';
import getRecordsDefaultInherited from '@salesforce/apex/DefaultAccessDemo.getInheritedSharingNestedRecords';
import getRecordsParentDefaultChildDefault from '@salesforce/apex/DefaultAccessDemo.getRecordsParentDefaultChildDefault';
import getRecordsParentDefaultChildWithSharing from '@salesforce/apex/DefaultAccessDemo.getRecordsParentDefaultChildWithSharing';
import getRecordsParentDefaultChildWithoutSharing from '@salesforce/apex/DefaultAccessDemo.getRecordsParentDefaultChildWithoutSharing';
import getRecordsParentDefaultChildInherited from '@salesforce/apex/DefaultAccessDemo.getRecordsParentDefaultChildInherited';

// With Sharing Demo methods
import getRecordsWithSharing from '@salesforce/apex/WithSharingDemo.getRecords';
import getRecordsWithSharingNested from '@salesforce/apex/WithSharingDemo.getDefaultNestedRecords';
import getRecordsWithSharingWithSharing from '@salesforce/apex/WithSharingDemo.getWithSharingNestedRecords';
import getRecordsWithSharingWithoutSharing from '@salesforce/apex/WithSharingDemo.getWithoutSharingNestedRecords';
import getRecordsWithSharingInherited from '@salesforce/apex/WithSharingDemo.getInheritedSharingNestedRecords';
import getRecordsParentWithSharingChildDefault from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingChildDefault';
import getRecordsParentWithSharingChildWithSharing from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingChildWithSharing';
import getRecordsParentWithSharingtChildWithoutSharing from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingtChildWithoutSharing';
import getRecordsParentWithSharingChildInherited from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingChildInherited';

// Without Sharing Demo methods
import getRecordsWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getRecords';
import getRecordsWithoutSharingNested from '@salesforce/apex/WithoutSharingDemo.getDefaultNestedRecords';
import getRecordsWithoutSharingWithSharing from '@salesforce/apex/WithoutSharingDemo.getWithSharingNestedRecords';
import getRecordsWithoutSharingWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getWithoutSharingNestedRecords';
import getRecordsWithoutSharingInherited from '@salesforce/apex/WithoutSharingDemo.getInheritedSharingNestedRecords';
import getRecordsParentWithoutSharingChildDefault from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildDefault';
import getRecordsParentWithoutSharingChildWithSharing from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildWithSharing';
import getRecordsParentWithoutSharingChildWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildWithoutSharing';
import getRecordsParentWithoutSharingChildInherited from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildInherited';

// Inherited Sharing Demo methods
import getRecordsInherited from '@salesforce/apex/InheritedSharingDemo.getRecords';
import getRecordsInheritedNested from '@salesforce/apex/InheritedSharingDemo.getDefaultNestedRecords';
import getRecordsInheritedWithSharing from '@salesforce/apex/InheritedSharingDemo.getWithSharingNestedRecords';
import getRecordsInheritedWithoutSharing from '@salesforce/apex/InheritedSharingDemo.getWithoutSharingNestedRecords';
import getRecordsInheritedInherited from '@salesforce/apex/InheritedSharingDemo.getInheritedSharingNestedRecords';
import getRecordsParentInheritedChildDefault from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildDefault';
import getRecordsParentInheritedChildWithSharing from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildWithSharing';
import getRecordsParentInheritedChildWithoutSharing from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildWithoutSharing';
import getRecordsParentInheritedChildInherited from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildInherited';


export default class SharingTest extends LightningElement {
    @track selectedBaseClass = '';
    @track selectedNestedClass = '';
    @track selectedChildClass = '';
    @track results = [];
    @track error = '';
    @track isLoading = false;

    columns = [
        { label: 'Id', fieldName: 'Id', type: 'text' },
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Stage', fieldName: 'StageName', type: 'text' }
    ];

    get isButtonDisabled() {
        return !this.selectedBaseClass;
    }

    handleBaseClassChange(event) {
        this.selectedBaseClass = event.target.value;
        this.results = [];
        this.error = '';
    }

    handleNestedClassChange(event) {
        this.selectedNestedClass = event.target.value;
        this.selectedChildClass = ''; // Reset child class when nested class changes
        this.results = [];
        this.error = '';
    }

    handleChildClassChange(event) {
        this.selectedChildClass = event.target.value;
        this.selectedNestedClass = ''; // Reset nested class when child class changes
        this.results = [];
        this.error = '';
    }

    async handleTestSharing() {
        this.isLoading = true;
        this.results = [];
        this.error = '';

        try {
            let records;
            const methodKey = `${this.selectedBaseClass}_${this.selectedChildClass || this.selectedNestedClass || ''}`;
            console.log('## methodKey', methodKey);
            switch(methodKey) {
                // Default Access Demo combinations
                case 'Default_':
                    records = await getRecordsDefault();
                    break;
                case 'Default_Default':
                    records = await getRecordsDefaultNested();
                    break;
                case 'Default_WithSharing':
                    records = await getRecordsDefaultWithSharing();
                    break;
                case 'Default_WithoutSharing':
                    records = await getRecordsDefaultWithoutSharing();
                    break;
                case 'Default_InheritedSharing':
                    records = await getRecordsDefaultInherited();
                    break;
                case 'Default_DefaultChild':
                    records = await getRecordsParentDefaultChildDefault();
                    break;
                case 'Default_WithSharingChild':
                    records = await getRecordsParentDefaultChildWithSharing();
                    break;
                case 'Default_WithoutSharingChild':
                    records = await getRecordsParentDefaultChildWithoutSharing();
                    break;
                case 'Default_InheritedSharingChild':
                    records = await getRecordsParentDefaultChildInherited;
                    break;

                // With Sharing Demo combinations
                case 'WithSharing_':
                    records = await getRecordsWithSharing();
                    break;
                case 'WithSharing_Default':
                    records = await getRecordsWithSharingNested();
                    break;
                case 'WithSharing_WithSharing':
                    records = await getRecordsWithSharingWithSharing();
                    break;
                case 'WithSharing_WithoutSharing':
                    records = await getRecordsWithSharingWithoutSharing();
                    break;
                case 'WithSharing_InheritedSharing':
                    records = await getRecordsWithSharingInherited();
                    break;
                case 'WithSharing_DefaultChild':
                    records = await getRecordsParentWithSharingChildDefault();
                    break;
                case 'WithSharing_WithSharingChild':
                    records = await getRecordsParentWithSharingChildWithSharing();
                    break;
                case 'WithSharing_WithoutSharingChild':
                    records = await getRecordsParentWithSharingtChildWithoutSharing();
                    break;
                case 'WithSharing_InheritedSharingChild':
                    records = await getRecordsParentWithSharingChildInherited();
                    break;

                // Without Sharing Demo combinations
                case 'WithoutSharing_':
                    records = await getRecordsWithoutSharing();
                    break;
                case 'WithoutSharing_Default':
                    records = await getRecordsWithoutSharingNested();
                    break;
                case 'WithoutSharing_WithSharing':
                    records = await getRecordsWithoutSharingWithSharing();
                    break;
                case 'WithoutSharing_WithoutSharing':
                    records = await getRecordsWithoutSharingWithoutSharing();
                    break;
                case 'WithoutSharing_InheritedSharing':
                    records = await getRecordsWithoutSharingInherited();
                    break;
                case 'WithoutSharing_DefaultChild':
                    records = await getRecordsParentWithoutSharingChildDefault();
                    break;
                case 'WithoutSharing_WithSharingChild':
                    records = await getRecordsParentWithoutSharingChildWithSharing();
                    break;
                case 'WithoutSharing_WithoutSharingChild':
                    records = await getRecordsParentWithoutSharingChildWithoutSharing();
                    break;
                case 'WithoutSharing_InheritedSharingChild':
                    records = await getRecordsParentWithoutSharingChildInherited();
                    break;

                // Inherited Sharing Demo combinations
                case 'InheritedSharing_':
                    records = await getRecordsInherited();
                    break;
                case 'InheritedSharing_Default':
                    records = await getRecordsInheritedNested();
                    break;
                case 'InheritedSharing_WithSharing':
                    records = await getRecordsInheritedWithSharing();
                    break;
                case 'InheritedSharing_WithoutSharing':
                    records = await getRecordsInheritedWithoutSharing();
                    break;
                case 'InheritedSharing_InheritedSharing':
                    records = await getRecordsInheritedInherited();
                    break;
                case 'InheritedSharing_DefaultChild':
                    records = await getRecordsParentInheritedChildDefault();
                    break;
                case 'InheritedSharing_WithSharingChild':
                    records = await getRecordsParentInheritedChildWithSharing();
                    break;
                case 'InheritedSharing_WithoutSharingChild':
                    records = await getRecordsParentInheritedChildWithoutSharing();
                    break;
                case 'InheritedSharing_InheritedSharingChild':
                    records = await getRecordsParentInheritedChildInherited();
                    break;
            }
            
            this.results = records;
            console.log('## records', records);
        } catch (error) {
            this.error = '## ' + error.body?.message || '## An error occurred while testing sharing behavior.';
        } finally {
            this.isLoading = false;
        }
    }
}