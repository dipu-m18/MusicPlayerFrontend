import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from '../../../shared/models/user';
import { RegistrationService } from './registration.service';
import { RegisterValidators} from '../../../shared/validators/admin.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

     user: User;
     registerForm: FormGroup;
    errorMessage: string;
    successMessage: string;
  constructor(private fb: FormBuilder, private registerService: RegistrationService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      emailId: ['', [Validators.required, RegisterValidators.validateEmailId], null],
      name: ['', [Validators.required, RegisterValidators.validatePassword], null],
      password: ['', [Validators.required], null],
      confirmPassword: ['', [Validators.required], null],
      phoneNumber: ['', [Validators.required, RegisterValidators.validatePhoneNumber], null]
    });
    this.registerForm.value.confirmPassword.setValidators([Validators.required,RegisterValidators.confirmPassword(this.registerForm.value.password)]);
 
  }

  registerUser() {
    this.errorMessage = "";
    this.successMessage = "";
    this.user = this.registerForm.value as User;

    this.registerService.registerUser(this.user)
        .subscribe(
            message => {
                this.successMessage = message;
                this.registerForm.reset();
            }
            , error => this.errorMessage = <any>error
        )
   }

   reset(){
    this.errorMessage='';
    this.successMessage=''
    this.registerForm.reset();
    
  }


}
