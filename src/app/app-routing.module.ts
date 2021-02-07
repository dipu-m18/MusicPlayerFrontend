import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from "./admin/admin-home/admin-home.component";
import { AdminRegistrationComponent } from './admin/admin-landing-page/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './admin/admin-landing-page/admin-login/admin-login.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';

const routes: Routes = [
  {path: 'admin/home', component: AdminHomeComponent},
  {path: 'admin/register', component: AdminRegistrationComponent},
  {path: 'admin/login', component: AdminLoginComponent},
  {
    path: 'image', component: ImagesComponent, children: [
      {path: 'upload', component: ImageComponent},
      {path: 'list', component: ImageListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
