import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideDollarSign } from '@ng-icons/lucide';
import { MAX_NUMBER_VALUE } from '../../shared/constants';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

@Component({
    selector: 'app-setup-expenses',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HlmFormFieldModule,
        HlmInputDirective,
        BrnSelectImports,
        HlmSelectImports,
        HlmIconComponent,
        HlmButtonDirective,
    ],
    providers: [provideIcons({ lucideDollarSign })],
    templateUrl: './setup-expenses.component.html',
    styleUrl: './setup-expenses.component.scss',
})
export class SetupExpensesComponent {
    @Output() sendData = new EventEmitter<{}>();
    @Output() updateSection = new EventEmitter<'previous' | 'next'>();

    fb = inject(FormBuilder);
    form: FormGroup;

    expenseTypes = [
        { label: 'Housing', value: 'housing' },
        { label: 'Investments', value: 'investments' },
        { label: 'Utilities', value: 'utilities' },
        { label: 'Groceries', value: 'groceries' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Other', value: 'other' },
    ];

    expenseValidators = [Validators.max(MAX_NUMBER_VALUE), Validators.min(0)];

    constructor() {
        this.form = this.fb.group({
            expenses: this.fb.array([], this.atLeastOneValidator),
        });

        for (const expense of this.expenseTypes) {
            this.addExpense(expense.value);
        }

        console.log(this.expenses.controls);
    }

    addExpense(name: string): void {
        this.expenses.push(this.fb.control(null, this.expenseValidators));
    }

    get expenses(): FormArray {
        return this.form.get('expenses') as FormArray;
    }

    deleteExpense(index: number): void {
        this.expenses.removeAt(index);
    }

    updateSectionFn(direction: 'previous' | 'next') {
        if (direction === 'next') {
            this.sendData.emit({});
        }

        this.updateSection.emit(direction);
    }

    atLeastOneValidator(control: AbstractControl): ValidationErrors | null {
        const isAnyFilled = (control as FormArray).controls.some(
            (control) => control.value
        );
        return isAnyFilled ? null : { atLeastOneRequired: true };
    }
}
