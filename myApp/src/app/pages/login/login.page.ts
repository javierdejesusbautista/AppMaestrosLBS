import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	frmLogin: FormGroup;
	msgErr: any = '';
	isLoginError: boolean = false;
	loginLoading: boolean = false;
	pageisLoading: boolean = true;


  constructor(private formBuilder: FormBuilder,
	private authService: AuthService,
	private router: Router) { 
		this.frmLogin = this.formBuilder.group({
        usuario: ['', [Validators.required]],
        password: ['',[Validators.required]]
      });
	}

  ngOnInit() {
	if(this.authService.isAuthenticated() || localStorage.getItem('USER_INFO') !== null) {
		this.router.navigate(['home']);
	}
  }

  ionViewWillEnter() {
	this.pageisLoading = true;
	if(this.authService.isAuthenticated() || localStorage.getItem('USER_INFO') !== null) {
		this.router.navigate(['home']);
	}
  }

  ionViewDidEnter() {
	setTimeout(() => { 
		this.pageisLoading = false;
	}, 2000);

  }

 async onLogin() {
	this.isLoginError = false;;
	
	try {
		this.loginLoading = true;
		if(this.frmLogin.status === 'INVALID'){
			this.loginLoading = false;
			return;
		}
		
		let data = this.frmLogin.value;
  
		await this.authService.login(data);
		
		this.frmLogin.reset();
		
		this.loginLoading = false;
		this.router.navigate(['home']);
  
  
	  }
	  catch(err) {
		  this.loginLoading = false;
		  this.msgErr = err;
		  this.isLoginError = true;
	  }

  }

  getKeyToken(key: string): string {

    const jwt = localStorage.getItem('USER_INFO');

    const jwtData = jwt!.split('.')[1];
    // let decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtJsonData = decodeURIComponent(escape(window.atob(jwtData)));
    const decodedJwtData = JSON.parse(decodedJwtJsonData);

    const value = decodedJwtData[key];

    return value;
  }

}
