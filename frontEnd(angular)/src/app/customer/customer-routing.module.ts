import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../Shared/services/authguard.guard';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerScheduleDataComponent } from './customer-schedule-data/customer-schedule-data.component';


const routes: Routes = [
  { path: 'dashboard', canActivate:[AuthguardGuard],component:CustomerListComponent},{path : 'customerScheduleData' , component: CustomerScheduleDataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
