import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import{MatDialogModule}from '@angular/material/dialog'
// import { MatMenuModule } from '@angular/material/menu';


import {MatToolbarModule}from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

import{MatMenuModule}from '@angular/material/menu';

const materialcomponents: any[] | Type<any> | ModuleWithProviders<{}> = [
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialcomponents,

  ],exports: [
    materialcomponents,
  ]
})
export class MaterialModule { }
