import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MaterialModule } from '../Shared/material/material.module';
import { AddPopupComponent } from './add-popup/add-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SchedulePopupComponent } from './schedule-popup/schedule-popup.component';
import { CustomerSchedulePopupComponent } from './customer-schedule-popup/customer-schedule-popup.component';
import { CustomerScheduleDataComponent } from './customer-schedule-data/customer-schedule-data.component';

@NgModule({
  declarations: [
    CustomerListComponent,

    AddPopupComponent,
    SchedulePopupComponent,
    CustomerSchedulePopupComponent,
    CustomerScheduleDataComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  // exports:[CustomerListComponent]
})
export class CustomerModule {}
