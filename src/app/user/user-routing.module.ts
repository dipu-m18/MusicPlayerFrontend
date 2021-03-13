import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingGuard } from '../app.routing-guard';
import { UserHomeComponent } from './user-home/user-home.component';
import { LoginComponent } from './user-landing-page/login/login.component';
import { RegistrationComponent } from './user-landing-page/registration/registration.component';
import { UserLandingPageComponent} from './user-landing-page/user-landing-page.component';
import { TracksComponent } from './user-home/tracks/tracks.component';
import { LikedTracksComponent} from './user-home/liked-tracks/liked-tracks.component';


const routes: Routes = [
    { path: 'applicationHome', component: UserLandingPageComponent, children: [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegistrationComponent}
    ]},
    { path: 'home', component: UserHomeComponent, canActivate: [RoutingGuard], children: [
        {path: '', redirectTo: 'tracks', pathMatch: 'full'},
        {path: 'tracks', component: TracksComponent},
        {path: 'likeTracks', component: LikedTracksComponent}
    ]},
    { path: '', redirectTo: '/applicationHome', pathMatch: 'full' }     
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule{}