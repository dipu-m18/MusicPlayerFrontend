import { AbstractControl } from '@angular/forms';

export class RegisterValidators{

    static validateEmailId(control: AbstractControl): any {
        let emailIdPattern: RegExp =/^[\w._]+@[A-Za-z]+\.(com|co\.in|org)$/;
        if (!emailIdPattern.test(control.value)) {
            return { "emailIdPatternError": true }
        }
        return null;
    }
     
     static validatePassword(control: AbstractControl): any {
        let pattern: RegExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let value = control.value;
        let matches: boolean = pattern.test(value);
        if(!matches){
            return { "passwordPatternError":true}
        }
        return null;
     }

     static confirmPassword(passwordControl: AbstractControl): any{
         return (confirmPassword: AbstractControl) => {
             if(passwordControl.value!=null && passwordControl.value != confirmPassword.value){
                 return {'confirmPassword': true}
             }
             return null;
         };
     }
}