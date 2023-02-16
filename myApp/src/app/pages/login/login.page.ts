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


  constructor(private formBuilder: FormBuilder,
	private authService: AuthService,
	private router: Router) { 
		this.frmLogin = this.formBuilder.group({
        usuario: ['', [Validators.required]],
        password: ['',[Validators.required]]
      });
	}

  ngOnInit() {
	if(this.authService.isAuthenticated()) {
		this.router.navigate(['home']);
	}
  }

 async onLogin() {
	console.log(this.frmLogin);
	
	try {
		if(this.frmLogin.status === 'INVALID') return;
		
		let data = this.frmLogin.value;
  
		await this.authService.login(data);
		
		this.frmLogin.reset();
		
		this.router.navigate(['home']);
  
  
	  }
	  catch(err) {
		  console.log("Error");
		  console.log(err);
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
