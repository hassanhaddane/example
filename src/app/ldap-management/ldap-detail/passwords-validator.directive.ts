import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export const passwordValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordValidator: true };
}

/**
 * Custom ErrorStateMatcher => https://material.angular.io/components/input/overview#changing-when-error-messages-are-shown
 * returns true (error exists) when the parent form group is invalid and the control has been touched 
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null)
    : boolean {
        return control.parent.invalid && control.touched;
        
    }
}