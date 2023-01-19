import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from 'src/app/Shared/services/auth.service';


@Component({
  selector: 'app-schedule-popup',
  templateUrl: './schedule-popup.component.html',
  styleUrls: ['./schedule-popup.component.css'],
})
export class SchedulePopupComponent implements OnInit {
  scheduleForm: FormGroup = this.fb.group({});
  date_times: any;
  constructor(
    
    private fb: FormBuilder,
    private authservice: AuthService,
    private dialogRef: MatDialogRef<SchedulePopupComponent>,
    
    @Inject(MAT_DIALOG_DATA) public cId: any
  ) {}

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      customerId: [this.cId.cId ],
    
      date_time: ['', [Validators.required]],
      // date_time : moment().format('MM/DD/YYYY HH:mm'),
      // this.sc.controls[''].setValue(
      //   this.editCustomer.description
    });
    console.warn(this.cId);
    // debugger;
    // this.tempCon = this.cId.cId;
    // this.scheduleForm.patchValue({ contact: this.cId.cId });
  }

  onSchedulePopup() {
    let data = this.scheduleForm.value;
    
    data.customerId = this.cId.cId;
    
    this.authservice.customerScheduler(data).subscribe((res: any) => {
      if (res.status == 200) {
        alert('success');

        //  this.authservice.subject.next('');
      }
      console.log(this.scheduleForm.value);
    });
    
  }

  
  }
  

