import { Component } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  singupForm: FormGroup;
  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
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
      'email': ['sunigussie@mum.edu', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'password': ['12345', Validators.required]
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
    this.dataService.register(this.singupForm.value)
      .subscribe((res) => {
        if (res.auth)
          localStorage.setItem("UserToken", res.token)
        else
          console.log(res.message)
      })
  }

  onSignIn(): void {
    this.dataService.login(this.signinForm.value)
      .subscribe((res) => {
        console.log("SignInResponse: ", res);
      })
  }

  asyncEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        this.dataService.verifyemail({ "email": control.value }).subscribe((res) => {
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

}