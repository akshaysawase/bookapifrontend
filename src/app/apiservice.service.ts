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

  public country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
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
// public downloadHeaders():HttpHeaders {
//   let headers = new HttpHeaders();
//   // let token = localStorage.getItem("token");
//   headers = headers.append('Content-Type', 'application/json; charset=utf-8');
//   if (token !== null) {
//       headers = headers.append("Authorization", token);
//   }
//   return headers;
// }

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
      localStorage.setItem('logout','true');
  }

  getSingleContact(data) : Observable<any>{
    return this.http.get(this.endPoint+"singleContact/"+data, {headers: this.getHeaders()});
    // return this.http.get(`http://localhost:3000/contact/singleContact/`+data, {headers: this.getHeaders()});
  }

  updateContact(data) : Observable<any>{
    return this.http.post(this.endPoint+"update",data, {headers : this.getHeaders()});
    // return this.http.post("http://localhost:3000/contact/update",data, {headers : this.getHeaders()});
  }

  checkPassword( data ) : Observable<any>{
    return this.http.post(this.endPoint+"checkpass",data, {headers : this.getHeaders()});
  }

  changePassword( data ): Observable<any>{
    return this.http.post(this.endPoint+"changepass",data, {headers : this.getHeaders()});
  }

  getCsv(data):Observable<any>{
    return this.http.get(this.endPoint+"downloadCsv/?id="+data, {
      observe: 'response',
      responseType: 'blob'
    }, );
  }

  getAllCountry() {
      return this.country_list;
  }

}
