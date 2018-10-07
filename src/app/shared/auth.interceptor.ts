import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { mergeMap, switchMap, flatMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === "GET") {
      return next.handle(req);
    }
    return this.authService.getToken2().pipe(
      switchMap(token => {
        const copiedReq = req.clone({
          // headers: req.headers.append('', '')
          params: req.params.set("auth", token)
        });
        return next.handle(copiedReq);
      })
    );
  }
}

// By Default, requests are immutable. You want to clone them before you edit them, so that you always
// work with a fresh request

// See here: https://medium.com/@danielcrisp/async-http-interceptors-with-angular-4-3-9e6e795da562
