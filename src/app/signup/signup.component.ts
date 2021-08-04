import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup , FormBuilder , Validators } from "@angular/forms";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private router : Router , private api : ApiserviceService, private formbuilder : FormBuilder ) { }

  signUpForm : FormGroup;
  submitted = false;
  success = "";
  public show = false;
  public error = false;
  public invalid = false;

  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      firstname : ['', Validators.required, Validators.minLength(2)],
      lastname : ['', Validators.required, Validators.minLength(2)],
      // mobile : ['', Validators.required, Validators.pattern(/^[789]\d{9}$/), Validators.minLength(10)],
      email : ['', [Validators.email, Validators.required]],
      password : [ '', [Validators.required, Validators.minLength(8)]],
      confirmPassword : [ '', [Validators.required]]
  });
  }

  get f (){
    return this.signUpForm.controls;
  }


  onSubmit(){

    this.submitted = true;
    if(this.signUpForm.invalid){
      console.log("Aye ! Nit Bhar...");
      this.invalid = true;
      return;
    }
    if(this.f.password.value !== this.f.confirmPassword.value){
      console.log("Password and Confirm Password Does Not Match");
      this.error = true;
      return;
    }

    let signUp = {
      firstname : this.f.firstname.value,
      lastname : this.f.lastname.value,

      email : this.f.email.value,
      password : this.f.password.value,

    }

    console.log(signUp);

  this.api.signUp(signUp).subscribe(res=>{
      this.success = res.success;
      this.show = true;
  },(err)=>{
    console.log("Error In OnSubmit "+err);
  }
  );
    this.signUpForm.reset();
  }


}
