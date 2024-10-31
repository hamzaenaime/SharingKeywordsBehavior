// sharingTest.js
import { LightningElement, track } from 'lwc';
// Omitted Access Demo methods
import getRecordsOmitted from '@salesforce/apex/OmittedAccessDemo.getRecords';
import getRecordsOmittedNested from '@salesforce/apex/OmittedAccessDemo.getOmittedNestedRecords';
import getRecordsOmittedWithSharing from '@salesforce/apex/OmittedAccessDemo.getWithSharingNestedRecords';
import getRecordsOmittedWithoutSharing from '@salesforce/apex/OmittedAccessDemo.getWithoutSharingNestedRecords';
import getRecordsOmittedInherited from '@salesforce/apex/OmittedAccessDemo.getInheritedSharingNestedRecords';
import getRecordsParentOmittedChildOmitted from '@salesforce/apex/OmittedAccessDemo.getRecordsParentOmittedChildOmitted';
import getRecordsParentOmittedChildWithSharing from '@salesforce/apex/OmittedAccessDemo.getRecordsParentOmittedChildWithSharing';
import getRecordsParentOmittedChildWithoutSharing from '@salesforce/apex/OmittedAccessDemo.getRecordsParentOmittedChildWithoutSharing';
import getRecordsParentOmittedChildInherited from '@salesforce/apex/OmittedAccessDemo.getRecordsParentOmittedChildInherited';

// With Sharing Demo methods
import getRecordsWithSharing from '@salesforce/apex/WithSharingDemo.getRecords';
import getRecordsWithSharingNested from '@salesforce/apex/WithSharingDemo.getOmittedNestedRecords';
import getRecordsWithSharingWithSharing from '@salesforce/apex/WithSharingDemo.getWithSharingNestedRecords';
import getRecordsWithSharingWithoutSharing from '@salesforce/apex/WithSharingDemo.getWithoutSharingNestedRecords';
import getRecordsWithSharingInherited from '@salesforce/apex/WithSharingDemo.getInheritedSharingNestedRecords';
import getRecordsParentWithSharingChildOmitted from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingChildOmitted';
import getRecordsParentWithSharingChildWithSharing from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingChildWithSharing';
import getRecordsParentWithSharingtChildWithoutSharing from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingtChildWithoutSharing';
import getRecordsParentWithSharingChildInherited from '@salesforce/apex/WithSharingDemo.getRecordsParentWithSharingChildInherited';

// Without Sharing Demo methods
import getRecordsWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getRecords';
import getRecordsWithoutSharingNested from '@salesforce/apex/WithoutSharingDemo.getOmittedNestedRecords';
import getRecordsWithoutSharingWithSharing from '@salesforce/apex/WithoutSharingDemo.getWithSharingNestedRecords';
import getRecordsWithoutSharingWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getWithoutSharingNestedRecords';
import getRecordsWithoutSharingInherited from '@salesforce/apex/WithoutSharingDemo.getInheritedSharingNestedRecords';
import getRecordsParentWithoutSharingChildOmitted from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildOmitted';
import getRecordsParentWithoutSharingChildWithSharing from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildWithSharing';
import getRecordsParentWithoutSharingChildWithoutSharing from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildWithoutSharing';
import getRecordsParentWithoutSharingChildInherited from '@salesforce/apex/WithoutSharingDemo.getRecordsParentWithoutSharingChildInherited';

// Inherited Sharing Demo methods
import getRecordsInherited from '@salesforce/apex/InheritedSharingDemo.getRecords';
import getRecordsInheritedNested from '@salesforce/apex/InheritedSharingDemo.getOmittedNestedRecords';
import getRecordsInheritedWithSharing from '@salesforce/apex/InheritedSharingDemo.getWithSharingNestedRecords';
import getRecordsInheritedWithoutSharing from '@salesforce/apex/InheritedSharingDemo.getWithoutSharingNestedRecords';
import getRecordsInheritedInherited from '@salesforce/apex/InheritedSharingDemo.getInheritedSharingNestedRecords';
import getRecordsParentInheritedChildOmitted from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildOmitted';
import getRecordsParentInheritedChildWithSharing from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildWithSharing';
import getRecordsParentInheritedChildWithoutSharing from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildWithoutSharing';
import getRecordsParentInheritedChildInherited from '@salesforce/apex/InheritedSharingDemo.getRecordsParentInheritedChildInherited';


export default class SharingTest extends LightningElement {
    @track selectedBaseClass = '';
    @track selectedNestedClass = '';
    @track selectedChildClass = '';
    @track results = [];
    @track testresults = [];
    @track error = '';
    @track isLoading = false;

    columns = [
        { label: 'Id', fieldName: 'Id', type: 'text' },
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Stage', fieldName: 'StageName', type: 'text' },
        { label: 'Type', fieldName: 'Type', type: 'text' }
    ];

    resultsColumns = [
        // { label: 'Id', fieldName: 'id', type: 'text' },
        { label: 'Base Class', fieldName: 'baseClass', type: 'text' },
        { label: 'Child Class', fieldName: 'childClass', type: 'text' },
        { label: 'Nested Class', fieldName: 'nestedClass', type: 'text' },
        { label: 'Viewable Records', fieldName: 'records', type: 'text' },
        { label: 'Access Type Field', fieldName: 'type', type: 'text' }
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
            switch(methodKey) {
                // Omitted Access Demo combinations
                case 'Omitted_':
                    records = await getRecordsOmitted();
                    break;
                case 'Omitted_Omitted':
                    records = await getRecordsOmittedNested();
                    break;
                case 'Omitted_WithSharing':
                    records = await getRecordsOmittedWithSharing();
                    break;
                case 'Omitted_WithoutSharing':
                    records = await getRecordsOmittedWithoutSharing();
                    break;
                case 'Omitted_InheritedSharing':
                    records = await getRecordsOmittedInherited();
                    break;
                case 'Omitted_OmittedChild':
                    records = await getRecordsParentOmittedChildOmitted();
                    break;
                case 'Omitted_WithSharingChild':
                    records = await getRecordsParentOmittedChildWithSharing();
                    break;
                case 'Omitted_WithoutSharingChild':
                    records = await getRecordsParentOmittedChildWithoutSharing();
                    break;
                case 'Omitted_InheritedSharingChild':
                    records = await getRecordsParentOmittedChildInherited();
                    break;

                // With Sharing Demo combinations
                case 'WithSharing_':
                    records = await getRecordsWithSharing();
                    break;
                case 'WithSharing_Omitted':
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
                case 'WithSharing_OmittedChild':
                    records = await getRecordsParentWithSharingChildOmitted();
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
                case 'WithoutSharing_Omitted':
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
                case 'WithoutSharing_OmittedChild':
                    records = await getRecordsParentWithoutSharingChildOmitted();
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
                case 'InheritedSharing_Omitted':
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
                case 'InheritedSharing_OmittedChild':
                    records = await getRecordsParentInheritedChildOmitted();
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
            this.handleResults();
        } catch (error) {
            this.error = '## ' + error.body?.message || '## An error occurred while testing sharing behavior.';
        } finally {
            this.isLoading = false;
        }
    }

    handleResults() {
        try { 
            const existingCombination = this.testresults.find(
                (result) =>
                    result.id === `${this.selectedBaseClass}_${this.selectedChildClass}_${this.selectedNestedClass}`
            );
            if (!existingCombination) {
                const records = this.results.length === 5 ? 'all' : 'shared records';
                const type = this.results.some(record => record.Type !== null) ? 'Yes' : 'No';
                this.testresults.push({
                    id: `${this.selectedBaseClass}_${this.selectedChildClass}_${this.selectedNestedClass}`,
                    baseClass: this.selectedBaseClass,
                    childClass: this.selectedChildClass,
                    nestedClass: this.selectedNestedClass,
                    records,
                    type
                });
            }
            this.testresults = [...this.testresults];
        } catch (error) {
            console.log('## error: ', error.message);
        }
    }
}