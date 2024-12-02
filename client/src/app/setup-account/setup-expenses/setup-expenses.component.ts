import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideDollarSign } from '@ng-icons/lucide';
import { MAX_INCOME_LENGTH } from '../../shared/constants';

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
    MAX_INCOME_LENGTH = MAX_INCOME_LENGTH;

    expenseTypes = [
        { label: 'Housing', value: 'housing' },
        { label: 'Investments', value: 'investments' },
        { label: 'Utilities', value: 'utilities' },
        { label: 'Groceries', value: 'groceries' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Others', value: 'others' },
    ];

    expenseValidators = [
        Validators.required,
        Validators.maxLength(MAX_INCOME_LENGTH),
        Validators.min(0),
    ];

    constructor() {
        this.form = this.fb.group({
            expenses: this.fb.array([]),
        });

        for (const expense of this.expenseTypes) {
            this.addExpense(expense.value);
        }
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
}
