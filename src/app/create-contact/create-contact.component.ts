import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from "@angular/forms";
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  constructor( private fb : FormBuilder , private api : ApiserviceService ) { }

  addContact : FormGroup;
  submitted = false;
  successMsg : string = "";
  contact = {};
  enableUpdate = false;
  conid : number =0;
  enableEdit : boolean =false ;

  ngOnInit(): void {
    const cid = localStorage.getItem('contactid');

    this.enableEdit = Boolean(localStorage.getItem('enableedit'));

    this.conid = parseInt(cid);
    console.log(cid);

    if(typeof(cid)==undefined || cid == null || cid == '' ){
      this.enableUpdate = false;
      this.addContact = this.fb.group({
        firstname : ['', Validators.required, Validators.minLength(2)],
        email : ['', [Validators.email, Validators.required]],
        mobile : ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
        address : ['' , [Validators.required]]
      });
    }else if(cid){
      console.log("inside conid");

      this.api.getSingleContact(cid).subscribe(
        res =>{
          this.addContact = this.fb.group({
            id : res.contact[0].id,
            firstname : res.contact[0].name,
            email : res.contact[0].email,
            mobile : res.contact[0].mobile,
            address : res.contact[0].address
          });
          this.enableUpdate = true;
          console.log(res.contact[0].name);
        },
        err =>{
            console.log("Error Occured in gesinglecontact api"+err);
        }
      );
      localStorage.removeItem('contactid');
    }
  }

  get f (){
    return this.addContact.controls;
  }

  onSubmit(){

    this.submitted = true;

    if(this.addContact.invalid){
      console.log("Form Is Invalid..");
      alert("Please Enter Valid Contact Details");
      return;
    }

    let contact = {
      firstname : this.f.firstname.value,
      email : this.f.email.value,
      mobile : this.f.mobile.value,
      address: this.f.address.value,
      isDeleted : false,
      image : null,
      createdBy : localStorage.getItem('id'),

    }
    console.log(contact);
    //api
    this.api.createContact(contact).subscribe(
      res =>{
        this.successMsg = res.message;
        alert("Contact Saved Successfully !");
      },
      err =>{
        console.log("Error in CreateContact "+err);
      }
    )
      this.addContact.reset();
  }






  onUpdate(){

    if(this.addContact.invalid){
      console.log("Form Is Invalid..");
      alert("Please Enter Valid Contact Details");
      return;
    }

    let contact = {
      firstname : this.f.firstname.value,
      email : this.f.email.value,
      mobile : this.f.mobile.value,
      address: this.f.address.value,
      id : this.conid
    }


    this.api.updateContact(contact).subscribe(
      res =>{
        console.log("Update Message - "+res.message);
        alert("Contact Updated Successfully !");
        if(res.message){
          this.api.getSingleContact(this.conid).subscribe(
            res =>{
              console.log("single contact got.. and Refreshed ");
            },
            err =>{
              console.log("Error in singleContact inside update Contact");
            }
          )
        }
      },
      err =>{
        console.log("Error in UpdateContact");
      }
    )
  }
}
