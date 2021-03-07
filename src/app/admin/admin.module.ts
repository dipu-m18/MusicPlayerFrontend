import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AdminLandingPageComponent } from '../admin/admin-landing-page/admin-landing-page.component';
import { AdminLoginComponent } from '../admin/admin-landing-page/admin-login/admin-login.component';
import { AdminRegistrationComponent } from '../admin/admin-landing-page/admin-registration/admin-registration.component';
import { AdminRegistrationService } from '../admin/admin-landing-page/admin-registration/admin-registration.service';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminUploadComponent } from '../admin/admin-home/admin-upload/admin-upload.component';
import { AdminActualHomeComponent } from './admin-home/admin-actual-home/admin-actual-home.component';
//import { AdminPlaySongComponent } from './admin-home/admin-play-song/admin-play-song.component';
import { AdminSongsComponent} from './admin-home/admin-songs/admin-songs.component';
import { AudioService } from './admin-home/admin-songs/audio.services';
import { AdminHomeComponent} from './admin-home/admin-home.component';
//////////
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
    declarations: [
        AdminHomeComponent,
        AdminLandingPageComponent,
        AdminLoginComponent,
        AdminRegistrationComponent,
        AdminUploadComponent,
        AdminActualHomeComponent,
        //AdminPlaySongComponent
        AdminSongsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        AdminRoutingModule,
        MatSliderModule
    ],
    providers:[
        AdminRegistrationService,
        AudioService
    ],
    exports: [
        
    ]
})

export class AdminModule{
    
}