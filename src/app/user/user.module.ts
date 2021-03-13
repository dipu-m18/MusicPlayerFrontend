import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { LikedTracksComponent } from './user-home/liked-tracks/liked-tracks.component';
import { TracksComponent } from './user-home/tracks/tracks.component';  
import { LoginService } from './user-landing-page/login/login.service';
import { RegistrationService } from './user-landing-page/registration/registration.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({


    declarations: [
        LikedTracksComponent,
        TracksComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        UserRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatSliderModule
    ],
    providers: [
        LoginService,
        RegistrationService
    ],
    exports: []
})

export class UserModule{

}