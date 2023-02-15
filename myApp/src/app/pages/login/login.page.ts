import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	frmLogin: FormGroup;


  constructor(private formBuilder: FormBuilder,
	) { 
		this.frmLogin = this.formBuilder.group({
        usuario: ['', [Validators.required]],
        password: ['',[Validators.required]]
      });
	}

  ngOnInit() {
  }

  onLogin() {
	console.log(this.frmLogin);
  }

}
