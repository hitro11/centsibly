import {
    AbstractControl,
    FormArray,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

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
