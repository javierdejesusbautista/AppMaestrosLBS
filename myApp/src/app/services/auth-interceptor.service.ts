import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private router: Router) { }


	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token: string = localStorage.getItem('USER_INFO')!;
		let request = req;

		
			if (token) {
				request = req.clone({
				setHeaders: {
					Authorization: `Bearer ${ token }`
				}
				});
			}
		

			return next.handle(request).pipe(
				catchError((err: HttpErrorResponse) => {

				if (err.status === 401) {
					this.router.navigate(['login'],{ replaceUrl: true });
					//this.navCtrl.navigateRoot('login');
				}

				return throwError( err );
				
				})
			);

		
		return next.handle(request);
	}


}
