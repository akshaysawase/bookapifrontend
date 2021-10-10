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
  countryName = [];
  updateCountry;
  showalert = false;
  updateStatus = false;

  conid : number =0;
  enableEdit : boolean =false ;

  ngOnInit(): void {
    const cid = localStorage.getItem('contactid');

    this.enableEdit = Boolean(localStorage.getItem('enableedit'));

    this.conid = parseInt(cid);


    if(typeof(cid)==undefined || cid == null || cid == '' ){
      this.enableUpdate = false;
      this.addContact = this.fb.group({
        firstname : ['', Validators.required, Validators.minLength(2)],
        email : ['', [Validators.email, Validators.required]],
        mobile : ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
        address : ['' , [Validators.required]],
        country : ['', [Validators.required]]
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
            address : res.contact[0].address,
            country : res.contact[0].country
          });
          this.enableUpdate = true;
          this.updateCountry = res.contact[0].country;
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

    if(this.addContact.invalid || this.f.country.value == null){
      console.log("Form Is Invalid..");
      this.errorStatus = true;
      setTimeout( ()=>{
        this.errorStatus = false;
      },3000 )
      return false;
    }

    let contact = {
      firstname : this.f.firstname.value,
      email : this.f.email.value,
      mobile : this.f.mobile.value,
      address: this.f.address.value,
      country: this.f.country.value,
      isDeleted : false,
      image : null,
      createdBy : localStorage.getItem('id'),

    }
    console.log(contact);
    //api
    this.api.createContact(contact).subscribe(
      res =>{
        this.successMsg = res.message;
        this.showalert = true;
        setTimeout( ()=>{
          this.showalert = false;
        },3000 )
      },
      err =>{
        console.log("Error in CreateContact "+err);
      }
    )
      this.addContact.reset();
  }



  getCountries(){

    return this.countryName = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  }


  errorStatus = false;


  onUpdate(){

    if(this.addContact.invalid || this.f.country.value==null){
      console.log("Form Is Invalid..");
      this.errorStatus = true;

      return;
    }

    let contact = {
      firstname : this.f.firstname.value,
      email : this.f.email.value,
      mobile : this.f.mobile.value,
      address: this.f.address.value,
      country: this.f.country.value,
      id : this.conid
    }


    this.api.updateContact(contact).subscribe(
      res =>{
        console.log("Update Message - "+res.message);

        this.updateStatus = true;
        setTimeout( ()=>{
          this.updateStatus = false;
        },3000)

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
