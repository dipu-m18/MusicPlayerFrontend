import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin} from '../../../shared/models/admin';
import { AdminLoginService } from '../admin-login/admin-login.service';
import { RegisterValidators } from '../../../shared/validators/admin.validator';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin: Admin;
  loginForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  
  tryToLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private adminLoginService: AdminLoginService,
    private router: Router) {
    
   }

  ngOnInit(): void {
    this.admin = new Admin();
    this.createForm();
  }

  createForm(){
    this.loginForm =this.formBuilder.group({
      email: ['', [Validators.required, RegisterValidators.validateEmailId]],
      pass: ['', [Validators.required, RegisterValidators.validatePassword]]
    });
  }

  login(){
    this.errorMessage="";
    this.successMessage="";
    this.admin.emailId = this.loginForm.value.email;
    this.admin.password = this.loginForm.value.pass;
    console.log(this.loginForm.value.pass)
    this.adminLoginService.login(this.admin).subscribe(
      (response) => {
        this.admin = response
        sessionStorage.setItem("admin", JSON.stringify(this.admin));
        sessionStorage.setItem("userType", JSON.stringify("Admin"));
        sessionStorage.setItem("sellerTacks", JSON.stringify(this.admin.tracks));
        this.router.navigate(['/admin/home']);
      }, error => this.errorMessage = <any> error
    )
  }

  reset(){
    this.errorMessage="";
    this.successMessage="";
    this.loginForm.reset();
  }

}
