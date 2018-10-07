import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        console.log("Logging interceptor", event);
      })
    );
  }
}

// tap allows you to execute some code on any data that goes through the observable WITHOUT consuming. Thats
// the difference to subscribe

// take a look at this - specific to response
// intercept(req: HttpRequest < any >, next: HttpHandler): Observable < HttpEvent < any >> {
//     return next.handle(req).map(event => {
//         if (event instanceof HttpResponse && shouldBeIntercepted(event)) {
//             event = event.clone({ body: resolveReferences(event.body) })
//         }
//         return event;
//     });
// }
