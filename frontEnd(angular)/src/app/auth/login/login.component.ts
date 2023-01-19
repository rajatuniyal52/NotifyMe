import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}

  myForm: FormGroup = this.fb.group({});
  hide = true;

  ngOnInit() {
    this.myForm = this.fb.group({
      Email: ['', [Validators.email, Validators.required]],
      Password: ['', Validators.required],
    });
  }

  onSubmit() {
    let data = this.myForm.value;
    this.authservice.logIn(data).subscribe((res: any) => {
      if (res.status == 200) {
        alert(res.message);
        this.router.navigateByUrl('customerlist');
      } else if (res.status == 401) {
        alert(res.message);
      } else if (res.status == 402) {
        alert(res.message);
      }
    });
    console.log(this.myForm.value);
  }
}
