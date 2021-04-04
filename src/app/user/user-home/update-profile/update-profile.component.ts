import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user';
import { UpdateProfileService } from './update-profile.service';
import { RegisterValidators} from '../../../shared/validators/admin.validator';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user: User;
  pUser: User;
  updateForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  isSubmitted=false;

  constructor(private fb: FormBuilder,
     private updateProfileService: UpdateProfileService,
     private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.updateForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required], null],
      confirmPassword: ['', [Validators.required], null],
      phoneNumber: ['', [Validators.required, RegisterValidators.validatePhoneNumber], null]
    });
    this.updateForm.value.confirmPassword.setValidators([Validators.required,RegisterValidators.confirmPassword(this.updateForm.value.password)]);
  }

  updateProfile(){
    this.isSubmitted=true;
    this.errorMessage="";
    this.successMessage="";
    this.user = this.updateForm.value as User;
    const userJson=sessionStorage.getItem("user")
    this.pUser = userJson!=null? JSON.parse(userJson) : new User();
    this.user.emailId = this.pUser.emailId
    this.updateProfileService.updateProfile(this.user)
          .subscribe(
            (message: any) => {
              this.successMessage = message;
              this.updateForm.reset();
            },
            (error:any) => this.errorMessage = <any>error

          )
  }

  resetForm(){
    this.updateForm.reset();
    this.isSubmitted=false;
    this.successMessage='';
    this.errorMessage='';
  }
}
