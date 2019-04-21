import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserDataService } from '../user.data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  singupForm: FormGroup;
  signinForm: FormGroup;
  isLogin: boolean = true;
  alertMessage: Alert = {
    hasError: false,
    message: ""
  };

  constructor(private formBuilder: FormBuilder, private userDataService: UserDataService, private router: Router) {
    this.singupForm = formBuilder.group({
      'firstname': ['surafel nigussie', [Validators.required]],
      'lastname': ['asfaw', Validators.required],
      'email': ['sunigussie@mum.edu', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'password': ['12345', Validators.required],
      'confirmpassword': ['12345', Validators.required]
    });

    this.signinForm = formBuilder.group({
      'email': ['email@www.com', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'password': ['password', Validators.required]
    });

    this.singupForm.valueChanges
      .subscribe(
        (data: any) => console.log(data)
      );

    this.signinForm.valueChanges
      .subscribe(
        (data: any) => console.log(data)
      );
  }

  onSignUp(): void {
    this.userDataService.register(this.singupForm.value)
      .subscribe((res) => {
        if (res.hasError)
          this.alertMessage = {
            hasError: true,
            message: res.message
          }
        else {
          localStorage.setItem("UserToken", res.token)
          this.router.navigate(['home'])
        }
      })
  }

  onSignIn(): void {
    this.userDataService.login(this.signinForm.value)
      .subscribe((res) => {
        if (res.hasError) {
          this.alertMessage = {
            hasError: true,
            message: res.message
          }
        } else {
          this.router.navigate(['home'])
        }
      })
  }

  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.userDataService.verifyemail({ "email": control.value }).subscribe((res) => {
        console.log("SignUpResponse: ", res);
        // if (control.value === 'sunigussie@mum.edu') {
        //   resolve({ 'invalid': true });
        // } else {
        //   resolve(null);
        // }
      })
    }
    );
    return promise;
  }

  switchFormState() {
    this.isLogin = !this.isLogin
  }

}

export interface Alert {
  hasError: boolean,
  message: string
}