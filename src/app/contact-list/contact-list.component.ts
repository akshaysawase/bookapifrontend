import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],


})
export class ContactListComponent implements OnInit {

  constructor(  private api : ApiserviceService, private router : Router ) { }

  public contact:Array<any> = [];
  successMsg = "";

  ngOnInit(): void {
    localStorage.removeItem("enableedit");
    this.api.getContactList().subscribe(
      res =>{
        this.contact = res.result;
        console.log(res.message);
      },
      err =>{
          console.log("Error in Getting contact list"+err);
      }
    )
  }


  deleteContact(id) {
    console.log(typeof(id));
      this.api.deleteContact(id).subscribe(
        res =>{
          this.successMsg = res.message;

        },
        err =>{
          console.log("Error in Delete Contact "+err);

        }
      )
      alert("Contact Deleted Successfully !");
      setTimeout( ()=>{
        window.location.reload();
      },500);

  }

  getContact(cid){
    localStorage.removeItem('contactid');
    localStorage.setItem('contactid',cid);
    this.router.navigate(["/createContact"]);
    localStorage.setItem("enableedit","true");
  }

}
