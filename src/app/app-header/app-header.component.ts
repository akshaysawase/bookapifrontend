import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from "@angular/router";
import { FormGroup , FormBuilder , Validators } from "@angular/forms";
import {ToastrService} from 'ngx-toastr'
import { AlertService } from '../alert/alert.service';
import { saveAs } from 'file-saver';
import { Alert, AlertType, PositiionType } from'../alert/alert.model';



@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor( private fb : FormBuilder, private api : ApiserviceService, private router : Router, public toastr: ToastrService,  private alertservice : AlertService  ) { }

  successMsg = "";
  changePass : FormGroup;
  Position = PositiionType;
  errorMsg = "";
  state : boolean;
  username : string = '';
  isChangePass = false;
  wrongPass = false;
  wrongPass2 = false;
  hideCurrent = true;



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
    this.changePass = this.fb.group({
      currentPass : ['', Validators.required],
      newPass : ['', [Validators.email, Validators.required]],
      confirmNewPass : ['', [Validators.required]],
    });
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
  public show = false;
  test(){
    this.show = true;
  }

  showCurrent(){
    this.hideCurrent = true;
    this.isChangePass = false;
    this.done = false;
    this.wrongPass = false;
    this.changePass.controls.currentPass.reset("");
  }

  logout(){
    this.api.logout();
    this.show = true;
    this.router.navigate(["/"]);

  }

  get f (){
    return this.changePass.controls;
  }

  public done :boolean = false;
  onSubmit(){

    let newPass = this.f.newPass.value;
    let conPass = this.f.confirmNewPass.value;
    let uid = localStorage.getItem("id");
    if(newPass !== conPass){
      this.errorMsg = "New Password & Confirm Password Not Matched !";
      this.wrongPass2 = true;
      return;
    }else{
      this.wrongPass2 = false;
      let password = {
        newPass : newPass,
        id : uid
      }
      this.api.changePassword(password).subscribe( (res)=>{
          console.log(res);
          this.successMsg = res.msg;
          this.done = true;
      }, (err)=>{
          console.log(err);
      })
    }

  this.changePass.reset("");

  }

  downloadCsv(){
    let id = localStorage.getItem("id");
    let username = localStorage.getItem("username");
    let cid = parseInt(id);
    this.api.getCsv(cid).subscribe((res)=>{
      const blob = new Blob([res.body], { type: 'text/csv' });
    saveAs(blob, `${username}ContactBook.csv`);
    console.log(res)
    }, (err)=>{
        console.log(err);
    });
  }


  continueForPass(){

    let uid = localStorage.getItem("id");
    let password = {
      password : this.f.currentPass.value,
      id : uid
    }
    this.api.checkPassword(password).subscribe( (res)=>{
      console.log(res);
       if(res.status == 0){
         console.log(this.wrongPass);
         this.errorMsg = res.err;
         this.wrongPass = true;
         console.log(this.wrongPass);
       }else if(res.msg === "Password Validated !"){
        this.isChangePass=true;
        this.hideCurrent = false;
       }
    } ,(err)=>{
      console.log(err);
    })
    this.changePass.controls.currentPass.reset("");
  }


  changepass(){
    this.isChangePass = true;

  }

}
