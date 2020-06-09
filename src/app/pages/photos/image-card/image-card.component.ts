import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {PhotosService} from "../photos.service";
import {GroupedImage, Image} from "../../../@core/data/image";
import {LightboxComponent} from "../lightbox/lightbox.component";
import {GeneralService} from "../../../@core/utils/general.service";
import {environment} from "../../../../environments/environment";
import {CompressedPhoto} from "../../../@core/data/photo";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import {NbToastrService} from "@nebular/theme";
import {UpdateImageComponent} from "../update-image/update-image.component";



@Component({
  selector: 'ngx-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {
  @Output("loadImages") loadImages: EventEmitter<any> = new EventEmitter();


  allImages: [Image];
  @Input() subject: String;
  @Input() groupedImage: [Image];
  @Input() groupKey: string;
  @Input() image: Image;
  @Input() imageTypes: Array<string>;

  @Input() loadingImages: boolean;

  showOverlay: boolean = false;
  deletingImage = false;

  galleryOptions: Array<NgxGalleryOptions>;

  testImage: any;
  constructor(
    private photosService: PhotosService,
    private dialogService: NbDialogService,
    private generalService: GeneralService,
    private toastr: NbToastrService,
  ) {
    this.galleryOptions = new Array<NgxGalleryOptions>();
  }

  imagesLoaded: Promise<boolean>;

  ngOnInit() {
    this.galleryOptions = [
      { thumbnails: false },
      { width: "100%", height: '500px'}
    ];
  }

  deleteImage(imageId) {
    this.deletingImage = true;
    this.generalService.delete(environment.models.photo, imageId).subscribe(data => {
      this.loadImages.emit();
      this.toastr.success('', data.code.message)
      this.deletingImage = false;

    })
  }

  deleteGroup(group) {
    this.deletingImage = true;
    this.photosService.deleteGroup(group).subscribe(data => {
      if(data.result) {
        this.toastr.success('', data.code.message);
        this.loadImages.emit();
      }
      this.deletingImage = false;
    })
  }

  openImage(image) {
    this.dialogService.open(LightboxComponent, {context: {
        image: image,
        allImages: this.allImages,
      }})
  }

  sliderImageClick(imageIndex) {
    this.dialogService.open(LightboxComponent, {context: {
        image: this.groupedImage[imageIndex],
        allImages: this.groupedImage,
        fromSlider: true
      }})
  }

  updateImage(imageID) {
    this.dialogService.open(UpdateImageComponent, {context: {
        image: this.image,
        imageTypes: this.imageTypes
      }})
  }



}
