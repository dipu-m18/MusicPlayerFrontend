import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { LoginService } from './login.service';
import { RegisterValidators} from '../../../shared/validators/admin.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  tryToLogin: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = new User;
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, RegisterValidators.validateEmailId]],
      password: ['', [Validators.required, RegisterValidators.validatePassword]]
    })
  }

  login(){
    this.tryToLogin = true;
    this.errorMessage ="";
    this.successMessage="";
    console.log(this.loginForm.value)
    this.user = this.loginForm.value as User;
    this.loginService.login(this.user).subscribe(
      (response) => {
        this.user = response
        sessionStorage.setItem("user", JSON.stringify(this.user));
        sessionStorage.setItem("userType", JSON.stringify("User"));
        //sessionStorage
        this.tryToLogin = false;
        this.router.navigate(['home/tracks']);
      },
      (error) => {
        this.tryToLogin = false;
        this.errorMessage = <any>error;
      }
    )
  }

  reset(){
    this.errorMessage='';
    this.successMessage=''
    this.loginForm.reset();
    
  }

}
