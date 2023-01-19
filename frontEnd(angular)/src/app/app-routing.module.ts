import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './Shared/services/authguard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((c) => c.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./customer/customer.module').then((c) => c.CustomerModule),canActivate:[AuthguardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
