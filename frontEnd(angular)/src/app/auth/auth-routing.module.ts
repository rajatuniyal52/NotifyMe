import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerListComponent } from '../customer/customer-list/customer-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'customerlist', component: CustomerListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
