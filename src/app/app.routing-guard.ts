import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RoutingGuard implements CanActivate{

    constructor(private route:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let userType = sessionStorage.getItem("userType");
        let toRet:boolean = false;
        if(userType!=null){
            if(sessionStorage.getItem("user")!=null){
                toRet = true;
            }else if(sessionStorage.getItem("admin")!=null){
                toRet = true;
            }
        }

        if(toRet){
            return toRet;
        }else{
            this.route.navigate(["error"]);
            return toRet;
        }
    }
}