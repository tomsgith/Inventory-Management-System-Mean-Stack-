import { Component, OnInit, Input } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserDataService, ErrorModel } from '../user.data.service';
import { Router } from '@angular/router';

export interface AlertModel {
  type: string;
  message: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [NgbAlertConfig]
})
export class UserComponent {
  singupForm: FormGroup;
  signinForm: FormGroup;
  isLogin: boolean = true;
  alerts: Array<AlertModel> = new Array();
  staticAlertClosed = false;

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
        if (res.hasError) {
          let alertModel: AlertModel;
          alertModel = {
            type: 'danger',
            message: res.message
          }
          this.alerts.push(alertModel)
        }
        else {
          localStorage.setItem("IMStoken", res.token)
          this.router.navigate(['home'])
        }
      })
  }

  onSignIn(): void {
    this.userDataService.login(this.signinForm.value)
      .subscribe((res) => {
        if (res.hasError) {
          let alertModel: AlertModel;
          alertModel = {
            type: 'danger',
            message: res.message
          }
          this.alerts.push(alertModel)
        } else {
          localStorage.setItem("IMStoken", res.token)
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

  showAlert(data: ErrorModel) {
    if (data.hasError) {
      let alertModel: AlertModel;
      alertModel = {
        type: 'danger',
        message: data.message
      }
      this.alerts.push(alertModel)
      setTimeout(() => this.staticAlertClosed = true, 2000);
    } else {
      let alertModel: AlertModel;
      alertModel = {
        type: 'success',
        message: data.message
      }
      this.alerts.push(alertModel)
      setTimeout(() => this.staticAlertClosed = true, 2000);
    }
  }

  close(alert: AlertModel) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}