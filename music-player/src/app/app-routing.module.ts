import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRegistrationComponent } from './admin/admin-landing-page/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './admin/admin-landing-page/admin-login/admin-login.component';

const routes: Routes = [
  {path: 'admin/register', component: AdminRegistrationComponent},
  {path: 'admin/login', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
