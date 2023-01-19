import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  constructor(private http: HttpClient) {}
  subject = new BehaviorSubject<any>('');
  // refresh = new BehaviourSubject<boolean>(false)
$isdata= new EventEmitter();
getSchedulepopup(event:any){
  this.$isdata.emit(event)
}
  signUp(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5000/auth/signup`, data);
  }
  logIn(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/auth/login', data);
  }

  popUp(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5000/auth/customer`, data);
  }
  getCustomer(): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/auth/customer-list`);
  }
  removeCustomer(id: string): Observable<any>{
    return this.http.delete<any>(`http://localhost:5000/auth/remove-customer/${id}`, {});
  }
  putCustomer(data :any,id:string  ): Observable<any>
  {
    return this.http.put<any>(`http://localhost:5000/auth/update-customer/${id}`, data);
  }
  customerScheduler(data:any):Observable<any>{
    return this.http.post<any>(`http://localhost:5000/auth/customer-scheduler`, data);
  }
  getSchedule():Observable<any>{
    return this.http.get<any>(`http://localhost:5000/auth//scheduleDb`);
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
}
