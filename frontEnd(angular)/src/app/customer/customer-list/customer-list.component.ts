import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddPopupComponent } from '../add-popup/add-popup.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { SchedulePopupComponent } from '../schedule-popup/schedule-popup.component';
import { webSocket } from 'rxjs/webSocket';
import { CustomerSchedulePopupComponent } from '../customer-schedule-popup/customer-schedule-popup.component';
import { CookieService } from 'ngx-cookie-service';

import * as $ from 'jquery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  socket = webSocket('ws://localhost:8081');
  dataSource: any;
  displayedColumns: string[] = ['name', 'contact', 'description', 'action'];
  badgeCount: number;
  flag = '';
  constructor(
    private dialog: MatDialog,
    private authservice: AuthService,
    public cookieService: CookieService,
    private router: Router
  ) {
    this.badgeCount = 0;
  }
  // hidden = false;

  // toggleBadgeVisibility() {
  //   this.hidden = !this.hidden;
  // }
  // isflag=""

  ngOnInit(): void {
    this.authservice.subject.subscribe((data) => {
      if (data == '') {
        this.getCustomer();
      }
    });
    this.getCustomer();

    // subscribing web socket data

    this.socket.subscribe((data: any) => {
      if (data) {
        this.cookieService.set('data', JSON.stringify(data));

        console.log(data, 'datta');
        this.Scheduler();
        this.badgeCount++;
        this.flag = data.customerId;
      }
    });
  }

  Scheduler() {
    this.dialog.open(CustomerSchedulePopupComponent, {
      disableClose: true,
    });
  }

  getCustomer() {
    this.authservice.getCustomer().subscribe((data: any) => {
      console.warn(data);
      this.dataSource = new MatTableDataSource(data.customer);
    });
  }
  openCustomerDialog() {
    const dialogRef = this.dialog.open(AddPopupComponent, {
      disableClose: true,
    });
  }
  openSchedulerDialog(customerId: any) {
    const dialogRef = this.dialog.open(SchedulePopupComponent, {
      disableClose: true,
      data: { cId: customerId },
    });
  }

  removeCustomer(id: string) {
    if (confirm('Are you sure to delete this record ?'))
      this.authservice.removeCustomer(id).subscribe((res: any) => {
        if (res.status == 200) {
          alert(res.message);
        }

        this.getCustomer();
        if (res.status == 400) {
          alert(res.message);
        }
      });
  }
  //   updateCustomer(id:string)
  //   {
  //     this.authservice.updateCustomer(id).subscribe((res: any) => {
  //       if(res.status == 200) {
  //         alert(res.message)
  //         this.getCustomer();
  //       }else if (res.status == 400) {
  //         alert(res.message)
  //       }
  //     })
  // }

  incrementCount() {
    this.badgeCount++;
  }
  clearCount() {
    this.badgeCount = 0;
  }
  updateCustomer(element: any) {
    this.dialog.open(AddPopupComponent, {
      // width: '20%',
      data: element,
      disableClose: true,
    });
  }

  logout() {
    this.router.navigateByUrl('');
  }
}
