import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contactmodel } from './contactmodel';
import { HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  endPoint = 'http://localhost:9000/contact/';
  test = this.endPoint+"getAllContact"

  constructor(private http : HttpClient) { }


  public getHeaders():HttpHeaders {
    let headers = new HttpHeaders();
    let token = localStorage.getItem("token");
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    if (token !== null) {
        headers = headers.append("Authorization", token);
    }
    return headers;
}

  getContactList() : Observable<any>{
   return this.http.get<Contactmodel[]>(this.endPoint+"getAllContact", {headers : this.getHeaders()});
  //  return this.http.get<Contactmodel[]>("http://localhost:3000/contact/getAllContact", {headers : this.getHeaders()});
  }

  addContact(data) : Observable<any>{
    return this.http.post(this.endPoint+"newContact",data);
    // return this.http.post("http://localhost:3000/contact/newContact",data);
  }

  signUp(data) : Observable<any>{
    return this.http.post(this.endPoint+"signup",data);
    // return this.http.post("http://localhost:3000/contact/signup",data);
  }

  deleteContact(data):Observable<any> {

    return this.http.delete(this.endPoint+"deleteContact/"+data , {headers : this.getHeaders()});
    // return this.http.delete("http://localhost:3000/contact/deleteContact/"+data , {headers : this.getHeaders()});
  }

  createContact(data): Observable<any>{
    return this.http.post(this.endPoint+"createContact",data, {headers : this.getHeaders()});
    // return this.http.post("http://localhost:3000/contact/createContact",data, {headers : this.getHeaders()});
  }

  signin(data) : Observable<any> {
    return this.http.post(this.endPoint+"signin",data);
    // return this.http.post("http://localhost:3000/contact/signin",data);
  }

  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('state');
      localStorage.removeItem('id');

  }

  getSingleContact(data) : Observable<any>{
    return this.http.get(this.endPoint+"singleContact/"+data, {headers: this.getHeaders()});
    // return this.http.get(`http://localhost:3000/contact/singleContact/`+data, {headers: this.getHeaders()});
  }

  updateContact(data) : Observable<any>{
    return this.http.post(this.endPoint+"update",data, {headers : this.getHeaders()});
    // return this.http.post("http://localhost:3000/contact/update",data, {headers : this.getHeaders()});
  }

}
