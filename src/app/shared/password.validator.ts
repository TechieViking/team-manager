//TOPIC: CROSS FIELD VALIDATION

import { AbstractControl } from "@angular/forms";
//Through 'control ' we get the access to all the form fields
export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }
    // password and confirm password fields are not blank and value of both are not equal, if true
    //return mismatch else null
    return password && confirmPassword && password.value != confirmPassword.value ?
        { 'misMatch': true } : null;
}


//IMPORTANT: passwordValidator is used on formGroup not on formControl 