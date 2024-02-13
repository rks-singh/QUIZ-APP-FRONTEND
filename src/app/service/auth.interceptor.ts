import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = "Authorization";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private loginService : LoginService
    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let auttRequest = req;
        const token = this.loginService.getToken();
        console.log("inside interceptro")
        if(token!=null){
            auttRequest = auttRequest.clone({
                setHeaders : {TOKEN_HEADER : `${token}`},
            });
        }
        return next.handle(auttRequest);
    }
}

export const authInterceptorProviders=[
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]