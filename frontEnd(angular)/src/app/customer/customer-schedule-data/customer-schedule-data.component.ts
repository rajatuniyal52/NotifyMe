import { Component, OnDestroy, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-customer-schedule-data',
  templateUrl: './customer-schedule-data.component.html',
  styleUrls: ['./customer-schedule-data.component.css'],
})
export class CustomerScheduleDataComponent implements OnInit, OnDestroy {
  dataSource: any = [];
  parsedData: any[] = [];
 
  displayedColumns: string[] = [
    'name',
    'contact',
    'description',
    'date',
    'time',
  ];
  flag: any = [];
  socket = webSocket('ws://localhost:8081');
  cookieValue: any;
  constructor(
    private authservice: AuthService,
    public cookieService: CookieService
  ) {}

  ngOnInit(): void {
    // debugger;
    // let a = this.cookieService.get('parseData');
    // let parseData = JSON.parse(<any>a);
    // this.parsedData.push(parseData)
    // let filterData = this.parsedData.filter(x => {return x.isSeen == true})
    // if(filterData.length >= 1) {

    // }else{

    // }

    let u = this.cookieService.get('data');
    let parseData = JSON.parse(<any>u);
    // parseData.map((x: any) => (x.isSeen = true));
    // this.cookieService.set('parseData', JSON.stringify(parseData));


    this.dataSource = parseData;
  }

  ngOnDestroy(): void {
    this.dataSource = [];
    this.cookieService.delete('data');
  }
}
