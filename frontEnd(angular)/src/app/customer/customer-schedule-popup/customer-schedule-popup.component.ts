import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-customer-schedule-popup',
  templateUrl: './customer-schedule-popup.component.html',
  styleUrls: ['./customer-schedule-popup.component.css'],
})
export class CustomerSchedulePopupComponent implements OnInit {
  dataSource: any;
  // { contact: 5, description: 'asdaf', name: 'sdfsw' },
  // { contact: 1000, description: 'wewe', name: 'ewewew' },

  displayedColumns: string[] = ['name', 'contact', 'description'];
  socket = webSocket('ws://localhost:8081');
  arr: any;

  constructor(private dialogRef: MatDialogRef<CustomerSchedulePopupComponent>, private authservice : AuthService, public cookieService: CookieService ) {}

  ngOnInit(): void {
    // this.authservice.$isdata.subscribe((data)=>{
      
    // })
    // this.socket.subscribe(data=>{
    //   if(data){
    //     this.dataSource= data
    //     }
    // })
   
    let u = this.cookieService.get('data');
   
    let parseData = JSON.parse(<any>u);
    // parseData.map((x: any) => (x.isSeen = true));
    // this.cookieService.set('parseData', JSON.stringify(parseData));

    this.dataSource = parseData;
    console.log(this.dataSource,"hhhh")
    // this.socket.subscribe((data: any) => {
      // if(data){
      //   this.dataSource = data
      // }
      // console.log('gggggg', data);
      // let data = customerdata.filter((x:any) => {return x.customerdata})
      // console.log('data', data)
      // this.dataSource.push({
      //   contact: data[0].customerdata.contact,
      //   name: data[0].customerdata.name,
      //   description: data[0].customerdata.description,
      // });
      // this.cdf.detectChanges();
      // data.forEach((element: any) => {
      //   console.log('datasss', element);
      // });
// if(data){
//   data=data;
      
// this.dataSource=[];

//     }
   
    // this.dataSource = data;
      // this.dataSource=this.arr
      // console.log('datasss', typeof this.dataSource);
      // console.log("hdhfhfhfh",data[0].customerdata)
      // customerdata.map((element: any) => {
      //   return {...element, customerdata: element.customerdata.filter((customerdata) => subElement.surname === 1)}
      // })
    // });
    
  }
  onclick(){
    this.dialogRef.close();
  }
  
}
