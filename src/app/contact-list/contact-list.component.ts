import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA , NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import {ToastrService} from 'ngx-toastr';
import { saveAs } from 'file-saver';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare const annyang: any;

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],


})
export class ContactListComponent implements OnInit {

  constructor( private ngZone: NgZone,  private api : ApiserviceService, private router : Router, public toastr: ToastrService) { }

  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;

  public searchText: string = '';
  public contact:Array<any> = [];
  public rowSingle: Array<any> = [];
  public show : boolean = false;

  successMsg = "";
  notFound:boolean = false;

  ngOnInit(): void {
    localStorage.removeItem("enableedit");
    this.api.getContactList().subscribe(
      res =>{
        this.contact = res.result;
        if(res.message == 'Data Not Found !'){
          this.notFound = true;
        }
        if(res.message == 'Contacts Successfully Fetched !!'){
          this.notFound = true;
        }
        console.log(res.message);
      },
      err =>{
          console.log("Error in Getting contact list"+err);
      }
    )
  }


  deleteContact(id) {
    console.log(typeof(id));
      this.api.deleteContact(id).subscribe(
        res =>{
          this.successMsg = res.message;

        },
        err =>{
          console.log("Error in Delete Contact "+err);

        }
      )
      // alert("Contact Deleted Successfully !");
      this.toastr.success(this.successMsg,'Deleted Successfully !');
      setTimeout( ()=>{
        window.location.reload();
      },500);

  }
  public deleteid;
  delete(delid){
      this.deleteid = delid;
      console.log(this.deleteid)
  }

  showModal(event){
    this.show = !this.show;
  }

  confirmDelete(){
    if(this.deleteid){
      this.deleteContact(this.deleteid);
    }
  }


  getContact(cid){
    localStorage.removeItem('contactid');
    localStorage.setItem('contactid',cid);
    localStorage.setItem("enableedit","true");
    this.router.navigate(["/createContact"]);

  }






  // Annyang
  initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;

      if(this.voiceText == "download csv"){
        let id = localStorage.getItem("id");
        let username = localStorage.getItem("username");
        this.api.getCsv(id).subscribe( (res)=>{
          const blob = new Blob([res.body], { type : "text/csv" });
          saveAs(blob, `${username}ContactBook.csv`);
        }, (err)=>{
          console.log(err);
        })
      }

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;
		this.voiceText = undefined;

		if(annyang){
      annyang.abort();
    }
	}

}
