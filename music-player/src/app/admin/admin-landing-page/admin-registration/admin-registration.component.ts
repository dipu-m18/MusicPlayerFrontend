import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { logging } from 'protractor';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  registerForm:FormGroup;
  submitted=false;
  errorMessage:string="";
  successMessage:string="";

  constructor(private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, this.validateEmail]],
      pass: ['', Validators.required],
      username: ['', Validators.required]
    });
  }
  
 
ngOnInit() {
}

 validateEmail(c: FormControl){
  let EMAIL_REGEXP = /^[\w._]+@[A-Za-z]+\.(com|co\.in|org)$/;

  return EMAIL_REGEXP.test(c.value) ? null : {
    emailError: {
      message: "Email is invalid"
    }
  };
}

 register(){
  this.errorMessage="";
  this.successMessage="";
}
}