import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import {
  validateOnlyChars,
  validatePasswordMatch,
} from 'src/app/validators/input.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // Forms Variables
  registerForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  userName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  formSubmitted: Boolean; // show error if try to submit form
  constructor(private _user: UsersService, private _router: Router) {
    this.formSubmitted = false;
    this.initForm();
    this.creatForm();
  }

  //initialize Form
  initForm() {
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      validateOnlyChars(),
    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      validateOnlyChars(),
    ]);
    this.userName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      validateOnlyChars(/@|_/g),
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.email,
    ]);
    this.password = new FormControl('', [Validators.required]);
    this.confirmPassword = new FormControl('', [Validators.required]);
  }

  //Create Form
  creatForm() {
    this.registerForm = new FormGroup(
      {
        lastName: this.lastName,
        firstName: this.firstName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      [validatePasswordMatch(this.password, this.confirmPassword)]
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    let user: User;
    user = this.registerForm.value;
    if (this.registerForm.valid) {
      this._user.register(user).subscribe(
        (data) => {
          console.log(data);
          this._router.navigate(['confirm'], {
            queryParams: { url: data.confirmationUrl },
          });
        },
        (err) => {
          // TODO: Show messages for failed validation in back end
          console.log(err);
        }
      );
    } else {
      this.formSubmitted = true;
    }
  }
}
