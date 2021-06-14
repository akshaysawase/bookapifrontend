import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./assets/css/style.css', './assets/vendor/bootstrap-icons/bootstrap-icons.css',
  './assets/vendor/bootstrap/css/bootstrap.min.css',
  './assets/vendor/boxicons/css/boxicons.min.css',
  './assets/vendor/glightbox/css/glightbox.min.css',
  './assets/vendor/remixicon/remixicon.css',
  './assets/vendor/swiper/swiper-bundle.min.css',
  // './assets/vendor/swiper/swiper-bundle.min.js'
  './assets/img/favicon.png',
  './assets/img/apple-touch-icon.png'

]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
