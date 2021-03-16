import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  constructor(private _user: UsersService, private _router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.createForm();
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._user.login(this.loginForm.value).subscribe(
        (data) => {
          console.log(data);

          localStorage.setItem('token', data.token);
          this._router.navigate(['']);
        },
        (err) => {
          console.log(err);
          if (err.error === 'Invalid Email or password') {
            // TODO: make error ui
            console.log(`try again`);
          } else if (err.error === 'You must confirm your email addresse') {
            // TODO: make error ui
            console.log(`need activation`);
          }
        }
      );
    }
  }
}
