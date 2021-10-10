import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule, ToastrService } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';


import { AlertModule } from './alert/alert.module';
import { FilterPipe } from './filter.pipe';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ContactListComponent,
    AppHeaderComponent,
    CreateContactComponent,
    ErrorMsgComponent,
    FilterPipe,
    ForgetPassComponent,
    ChangePassComponent,
    // AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 2000, enableHtml: true }),
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
