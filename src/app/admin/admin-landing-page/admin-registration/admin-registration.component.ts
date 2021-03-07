import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { logging } from 'protractor';
import { Admin } from "../../../shared/models/admin";
import { AdminRegistrationService} from "../admin-registration/admin-registration.service";
import { RegisterValidators } from "../../../shared/validators/admin.validator";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  admin: Admin;
  registerForm:FormGroup;
  submitted=false;
  errorMessage:string="";
  successMessage:string="";

  constructor(private formBuilder: FormBuilder, private adminRegistrationService: AdminRegistrationService) { 
  }
  
 
ngOnInit() { 
  this.admin =new Admin();
  this.createForm();
}

createForm(){
  this.registerForm = this.formBuilder.group({
    email: ['', [Validators.required, RegisterValidators.validateEmailId]],
    pass: ['', Validators.required, RegisterValidators.validatePassword],
    passConfirm: ['', Validators.required, RegisterValidators.validatePassword],
    username: ['', Validators.required],
    key: ['', Validators.required]
  });
  }

reset(){
  this.errorMessage='';
  this.successMessage=''
  this.registerForm.reset();
  
}

 register(){
  this.errorMessage="";
  this.successMessage="";
  //this.admin= this.registerForm.value as Admin;
  this.admin.emailId = this.registerForm.value.email;
  this.admin.name = this.registerForm.value.username;
  this.admin.password= this.registerForm.value.pass;
  console.log("ssss");
  console.log(this.admin);
  if(this.registerForm.value.key == environment.registerKey){
    this.adminRegistrationService.registerAdmin(this.admin).subscribe(
      (response: any) => {
        console.log(response);
        this.successMessage=response;
        this.reset();
      },
      (error: any) => this.errorMessage = <any>error
    )
  }else {
    this.errorMessage="Invalid Key";
  }
  
 }


}