import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor( private api : ApiserviceService, private router : Router  ) { }

  successMsg = "";
  errorMsg = "";
  state : boolean;
  username : string = '';


  ngOnInit(): void {
    if(localStorage.getItem("state") == "true" ){
        this.state = true;
        this.username = localStorage.getItem("username");
    }else if(localStorage.getItem("state") !== "true" ){
      this.state = false;
      alert("You Need to login first");
      this.router.navigate(["/login"]);
      return;
    }
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
  public contact:Array<any> = [];

  deleteContact(id) {
    console.log(typeof(id));
      // this.api.deleteContact(id).subscribe(
      //   res =>{
      //     this.successMsg = res.message;
      //     this.router.navigateByUrl("contactlist");
      //   },
      //   err =>{
      //     console.log("Error in Delete Contact "+err);

      //   }
      // )
      window.location.reload();
  }

  logout(){
    this.api.logout();
    alert("You're Logged Out Successfully !");
  }

}
