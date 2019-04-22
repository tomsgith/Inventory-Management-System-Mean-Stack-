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

  constructor(private formBuilder: FormBuilder, private userDataService: UserDataService, private router: Router) {
    this.singupForm = formBuilder.group({
      'firstname': new FormControl('surafel nigussie', Validators.required),
      'lastname': new FormControl('asfaw', Validators.required),
      'email': new FormControl('sunigussie@mum.edu', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('12345', Validators.required),
      'confirmpassword': new FormControl('12345', Validators.required)
    });

    this.signinForm = formBuilder.group({
      'email': new FormControl('sunigussie@mum.edu', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('12345', Validators.required),
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
    } else {
      let alertModel: AlertModel;
      alertModel = {
        type: 'success',
        message: data.message
      }
      this.alerts.push(alertModel)
    }
  }

  close(alert: AlertModel) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}