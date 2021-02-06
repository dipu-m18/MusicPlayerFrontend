import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLandingPageComponent } from '../admin/admin-landing-page/admin-landing-page.component';
import { AdminLoginComponent } from '../admin/admin-landing-page/admin-login/admin-login.component';
import { AdminRegistrationComponent } from '../admin/admin-landing-page/admin-registration/admin-registration.component';

const routes: Routes = [

    {path: 'admin', component: AdminLandingPageComponent, children: [
        {path: 'login', component: AdminLoginComponent},
        {path: 'register', component: AdminRegistrationComponent}
    ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }