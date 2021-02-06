import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './uploader/uploader.component';

import { AdminLandingPageComponent } from '../admin/admin-landing-page/admin-landing-page.component';
import { AdminLoginComponent } from '../admin/admin-landing-page/admin-login/admin-login.component';
import { AdminRegistrationComponent } from '../admin/admin-landing-page/admin-registration/admin-registration.component';
import {AdminRoutingModule} from './admin-routing.module';

@NgModule({
    declarations: [
        AdminLandingPageComponent,
        AdminLoginComponent,
        AdminRegistrationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AdminRoutingModule
    ],
    providers:[],
    exports: []
})

export class AdminModule{
    
}