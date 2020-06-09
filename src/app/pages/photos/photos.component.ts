import { Component, OnInit } from '@angular/core';
import {PhotosService} from "./photos.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'ngx-photos',
  template: `
      <div class="row">
          <div class="col-md-12">
              <nb-card>
                  <nb-card-header>
                      Nahrajte nové obrázky
                  </nb-card-header>
                  <nb-card-body>
                      <ngx-add-photo></ngx-add-photo>
                  </nb-card-body>
              </nb-card>
          </div>
      </div>
      <ngx-photos-overview></ngx-photos-overview>
  `,
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  image;

  constructor(
    private photoService: PhotosService,
    private _sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {

  }

}
