import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLandingPageComponent } from '../admin/admin-landing-page/admin-landing-page.component';
import { AdminLoginComponent } from '../admin/admin-landing-page/admin-login/admin-login.component';
import { AdminRegistrationComponent } from '../admin/admin-landing-page/admin-registration/admin-registration.component';
import {AdminUploadComponent } from './admin-home/admin-upload/admin-upload.component';
import {AdminSongsComponent} from './admin-home/admin-songs/admin-songs.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import { AdminActualHomeComponent} from './admin-home/admin-actual-home/admin-actual-home.component';
//import { AdminPlaySongComponent } from './admin/admin-home/admin-play-song/admin-play-song.component';


const routes: Routes = [

    {path: 'login', component: AdminLoginComponent},
    {path: 'register', component: AdminRegistrationComponent},
    {path : 'admin', component:AdminHomeComponent, children: [
        {path: 'home', component: AdminActualHomeComponent},
        {path: 'upload', component: AdminUploadComponent},
        {path: 'songs', component: AdminSongsComponent},
        
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }