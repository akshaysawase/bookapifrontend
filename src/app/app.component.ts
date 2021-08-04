import { Component, NgZone } from '@angular/core';
import { ApiserviceService } from './apiservice.service';

import { FormGroup , FormBuilder , Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thebook';

  constructor( private api : ApiserviceService, private formbuilder : FormBuilder ){}
  addContactForm : FormGroup;
  submitted = false;




  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addContactForm = this.formbuilder.group({
        name : ['', Validators.required],
        mobile : ['',Validators.required],
        address : ['', Validators.required],
        email : ['',Validators.email]
    });

  }
  contact = [];
  msg = "";
  msg2 = "";
  newContact = [];



  getContact(){
    this.api.getContactList().subscribe(res =>{
        this.msg = res.message;
        this.contact = res.result;
        console.log(res.message);
    },(err)=>{
      console.log("Error in getContact()");
    })
  }

  // addContact(){
  //   this.api.addContact().subscribe(res=>{
  //       this.msg2= res.message;
  //   });
  // }


  get f (){
    return this.addContactForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.addContactForm.invalid){
      console.log("Nit Form Bhar");
      return;
    }
    let newContact = {
      // name : this.addContactForm.get("name").value,
      // mobile : this.addContactForm.get("mobile").value,
      // email : this.addContactForm.get("email").value,4
      name : this.f.name.value,
      mobile : this.f.mobile.value,
      email : this.f.email.value,
      address : this.f.address.value,
      isdeleted : false
    }
    console.log(newContact);

    this.api.addContact(newContact).subscribe(res=>{
        this.msg2 = res.message;
        this.newContact = res.result;
    },(err)=>{
      console.log("ashdk");
    }
    );
    this.addContactForm.reset();
  }

  // deleteContact (){
  //   this.api.deleteContact().subscribe(res=>{
  //     this.msg2 = res.message;
  //   },(err)=>{
  //     console.log("Error in DeleteContact");
  //   })
  // }

}

