import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { ContactListComponent } from './contact-list/contact-list.component';
import { CreateContactComponent } from './create-contact/create-contact.component';


const routes: Routes = [

  { path : '', component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'signup', component: SignupComponent },
  { path : 'contactlist', component : ContactListComponent },
  { path : 'createContact', component : CreateContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }



 }
