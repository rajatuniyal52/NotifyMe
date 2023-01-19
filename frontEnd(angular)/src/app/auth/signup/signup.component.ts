import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}
  myForm: FormGroup = this.fb.group({});
  hide = true;
  hideconfirm = true;
  ngOnInit(): void {
    this.myForm = this.fb.group(
      {
        FirstName: ['', [Validators.required]],
        LastName: ['', [Validators.required]],
        Email: [
          '',
          [
            Validators.email,
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        Password: ['', [Validators.required]],
        ConfirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.MustMatch('Password', 'ConfirmPassword'),
      }
    );
  }

  get FirstName(): AbstractControl {
    return this.myForm.get('FirstName') as FormControl;
  }
  get LastName(): AbstractControl {
    return this.myForm.get('LastName') as FormControl;
  }
  get Email(): AbstractControl {
    return this.myForm.get('Email') as FormControl;
  }
  get Password(): AbstractControl {
    return this.myForm.get('Password') as FormControl;
  }
  get ConfirmPassword(): AbstractControl {
    return this.myForm.get('ConfirmPassword') as FormControl;
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingcontrol = formGroup.controls[matchingControlName];
      if (matchingcontrol.errors && !matchingcontrol.errors['MustMatch']) {
        return;
      }
      if (control.value !== matchingcontrol.value) {
        matchingcontrol.setErrors({ MustMatch: true });
      } else {
        matchingcontrol.setErrors(null);
      }
    };
  }

  onSignup() {
    let data = this.myForm.value;
    this.authservice.signUp(data).subscribe((res: any) => {
      if (res.status == 200) {
        alert('success');
        this.router.navigateByUrl('customerlist');
      } else if (res.status == 400) {
        alert(res.message);
      }
    });
    console.log(this.myForm.value);
  }
}
