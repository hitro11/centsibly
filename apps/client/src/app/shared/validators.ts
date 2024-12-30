import {
    AbstractControl,
    FormArray,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { Expense } from 'utils/schemas/schemas';
import { ZodSchema } from 'zod';

export function noDuplicateNames(fieldToCheck: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control instanceof FormArray && control.length === 0) {
            return null;
        }

        const names = [];

        for (const expense of (control as FormArray).controls) {
            names.push(expense.value[fieldToCheck]);
        }

        return names.length === new Set(names).size
            ? null
            : { duplicateNames: true };
    };
}

export function zodValidator(schema: ZodSchema): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const result = schema.safeParse(control.value);
        if (result.success) {
            return null;
        } else {
            return {
                zodError: result.error.errors
                    .map((err) => err.message)
                    .join(', '),
            };
        }
    };
}
