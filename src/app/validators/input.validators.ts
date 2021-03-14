import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function validateOnlyChars(
  specialCharAllowed: RegExp = /.^/g
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    {
      const value = control.value.replace(specialCharAllowed, '');
      if (value.match(/\d|\W|\s|_/)) {
        return { notChar: true };
      }

      return null;
    }
  };
}

export function validatePasswordMatch(
  control1: AbstractControl,
  control2: AbstractControl
): ValidatorFn {
  return (): ValidationErrors | null => {
    if (control1.value !== control2.value) {
      control1.setErrors({ ...control1.errors, passwordNotMatch: true });
      control2.setErrors({ ...control2.errors, passwordNotMatch: true });
      return;
    }
    let e1 = control1.errors;
    let e2 = control2.errors;
    if (e1) {
      delete e1['passwordNotMatch'];
      if (Object.keys(e1).length === 0) e1 = null;
    }
    if (e2) {
      delete e2['passwordNotMatch'];
      if (Object.keys(e2).length === 0) e2 = null;
    }
    control1.setErrors(e1);
    control2.setErrors(e2);
    return null;
  };
}
