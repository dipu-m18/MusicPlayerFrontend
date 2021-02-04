import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string="";
  successMessage: string="";

  constructor(private formBuilder: FormBuilder) {
    this.loginForm =this.formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  login(){
    this.errorMessage="";
    this.successMessage="";
  }

}
