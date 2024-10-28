// sharingTest.js
import { LightningElement, track } from 'lwc';
// Default Access Demo methods
import getRecordsDefault from '@salesforce/apex/DefaultAccessDemo.getRecords';
import getRecordsDefaultNested from '@salesforce/apex/DefaultAccessDemo.getDefaultNestedRecords';
import getRecordsDefaultWithSharing from '@salesforce/apex/DefaultAccessDemo.getWithSharingNestedRecords';
import getRecordsDefaultWithoutSharing from '@salesforce/apex/DefaultAccessDemo.getWithoutSharingNestedRecords';
import getRecordsDefaultInherited from '@salesforce/apex/DefaultAccessDemo.getInheritedSharingNestedRecords';

// With Sharing Demo methods
import getRecordsWithSharing from '@salesforce/apex/WithSharingDemo.getRecords';
import getRecordsWithSharingNested from '@salesforce/apex/WithSharingDemo.getDefaultNestedRecords';
import getRecordsWithSharingWithSharing from '@salesforce/apex/WithSharingDemo.getWithSharingNestedRecords';
import getRecordsWithSharingWithoutSharing from '@salesforce/apex/WithSharingDemo.getWithoutSharingNestedRecords';
import getRecordsWithSharingInherited from '@salesforce/apex/WithSharingDemo.getInheritedSharingNestedRecords';

// Without Sharing Demo methods
import getRecordsWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getRecords';
import getRecordsWithoutSharingNested from '@salesforce/apex/WithoutSharingDemo.getDefaultNestedRecords';
import getRecordsWithoutSharingWithSharing from '@salesforce/apex/WithoutSharingDemo.getWithSharingNestedRecords';
import getRecordsWithoutSharingWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getWithoutSharingNestedRecords';
import getRecordsWithoutSharingInherited from '@salesforce/apex/WithoutSharingDemo.getInheritedSharingNestedRecords';

// Inherited Sharing Demo methods
import getRecordsInherited from '@salesforce/apex/InheritedSharingDemo.getRecords';
import getRecordsInheritedNested from '@salesforce/apex/InheritedSharingDemo.getDefaultNestedRecords';
import getRecordsInheritedWithSharing from '@salesforce/apex/InheritedSharingDemo.getWithSharingNestedRecords';
import getRecordsInheritedWithoutSharing from '@salesforce/apex/InheritedSharingDemo.getWithoutSharingNestedRecords';
import getRecordsInheritedInherited from '@salesforce/apex/InheritedSharingDemo.getInheritedSharingNestedRecords';


export default class SharingTest extends LightningElement {
    @track selectedBaseClass = '';
    @track selectedNestedClass = '';
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
        this.results = [];
        this.error = '';
    }

    async handleTestSharing() {
        this.isLoading = true;
        this.results = [];
        this.error = '';

        try {
            let records;
            const methodKey = `${this.selectedBaseClass}_${this.selectedNestedClass}`;
            
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
            }
            
            this.results = records;
        } catch (error) {
            this.error = error.body?.message || 'An error occurred while testing sharing behavior.';
        } finally {
            this.isLoading = false;
        }
    }
}