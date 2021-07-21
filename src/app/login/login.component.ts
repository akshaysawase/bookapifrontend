import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ApiserviceService } from "../apiservice.service";
import { AlertService } from '../alert/alert.service';
import { Alert, AlertType, PositiionType } from'../alert/alert.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private api : ApiserviceService , private fb : FormBuilder, private router : Router, private alertservice : AlertService) { }

  signin : FormGroup;
  Position = PositiionType;
  success : "";

  get f (){
    return this.signin.controls;
  }


  ngOnInit(): void {

    this.signin = this.fb.group({
        emailid : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required] ]
    });


  }

   onSubmit(){

      if(this.signin.invalid){
        console.log("Invalid Credentials");
        this.alertservice.error("Invalid Credentials ! Please Log in ","Error");
        return
      }

      let signin = {
        emailid : this.f.emailid.value,
        password : this.f.password.value
      }
      this.api.signin(signin).subscribe(
        res =>{
          this.success = res.message;

          if(typeof(res.token) != "undefined"){
            localStorage.setItem('token', res.token);
            localStorage.setItem("state","true");
            localStorage.setItem("id",res.id);
            localStorage.setItem("username",res.name);
          }

          console.log(res.token);
          if(res.code == 0){
            this.alertservice.error(res.Error, 'Error');
            return;
          }

          this.alertservice.success(res.message,'Success');
          this.router.navigate(["/contactlist"]);

        },
        err =>{
          this.alertservice.error(err,'Invalid Credits');
        }
      )
   }

}
