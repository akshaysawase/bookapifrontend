import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ApiserviceService } from "../apiservice.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private api : ApiserviceService , private fb : FormBuilder, private router : Router) { }

  signin : FormGroup;
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
        alert("Invalid Credentials ! Please Log in ");
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
            alert(res.Error);
            return;
          }

          alert(res.message);
          this.router.navigate(["/contactlist"]);

        },
        err =>{
          alert("Invalid Credits");
        }
      )
   }

}
