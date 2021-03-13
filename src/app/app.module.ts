import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLandingPageComponent } from './admin/admin-landing-page/admin-landing-page.component';
import { AdminLoginComponent } from './admin/admin-landing-page/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './admin/admin-landing-page/admin-registration/admin-registration.component';
import { AdminUploadComponent } from './admin/admin-home/admin-upload/admin-upload.component';
import { AdminSongsComponent } from './admin/admin-home/admin-songs/admin-songs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RoutingGuard} from './app.routing-guard';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserLandingPageComponent } from './user/user-landing-page/user-landing-page.component';
import { LoginComponent } from './user/user-landing-page/login/login.component';
import { RegistrationComponent } from './user/user-landing-page/registration/registration.component';
import { UserModule } from './user/user.module';
////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    UserLandingPageComponent,
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, BrowserAnimationsModule, // storage,
    AdminModule,
    UserModule
  ],
  providers: [RoutingGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
