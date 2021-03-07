import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from "./admin/admin-home/admin-home.component";
import { AdminRegistrationComponent } from './admin/admin-landing-page/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './admin/admin-landing-page/admin-login/admin-login.component';
import { AdminUploadComponent } from './admin/admin-home/admin-upload/admin-upload.component';
import { AdminSongsComponent } from './admin/admin-home/admin-songs/admin-songs.component';
import { AuthorisationErrorComponent } from './shared/authorisation-error/authorisation-error.component'
import { AdminActualHomeComponent} from './admin/admin-home/admin-actual-home/admin-actual-home.component';
import { AdminPlaySongComponent } from './admin/admin-home/admin-play-song/admin-play-song.component';

const routes: Routes = [
  {path: 'error', component: AuthorisationErrorComponent},
   {path: '', redirectTo: '/applicationHome/', pathMatch:'full'},
  // {path : 'admin', component:AdminHomeComponent, children: [
  //   {path: 'home', component: AdminActualHomeComponent},
  //   {path: 'upload', component: AdminUploadComponent},
  //   {path: 'songs', component: AdminSongsComponent},
  //   {path: 'play-songs', component: AdminPlaySongComponent}
// ]}, 
  // {path: 'admin/home', component: AdminHomeComponent},
  // {path: 'admin/register', component: AdminRegistrationComponent},
  // {path: 'admin/login', component: AdminLoginComponent},
  // {path: 'admin/upload', component: AdminUploadComponent},
  // {path: 'admin/songs', component: AdminSongsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
