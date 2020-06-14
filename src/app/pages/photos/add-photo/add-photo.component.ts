import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import {CompressedPhoto, NewPhotoSet} from "../../../@core/data/photo";
import {NgxImageCompressService} from "ngx-image-compress";
import {PhotosService} from "../photos.service";
import {Image} from "../../../@core/data/image";
import {NbToastrService, NbPopoverDirective, NbDialogService} from "@nebular/theme"
import {UpdateImageComponent} from "../update-image/update-image.component";

@Component({
  selector: 'ngx-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  @Output("loadImages") loadImages: EventEmitter<any> = new EventEmitter();


  @Input() subject: string;

  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;

  photoDescription: string;
  thumbnailFiles: Array<CompressedPhoto>;
  bigImages: Array<CompressedPhoto>;
  classYear;

  file;

  localUrl: any;
  localCompressedUrl: any;
  sizeOfOriginalImage: number;
  sizeOfCompressedImage: number;
  compressingImages: boolean = false;
  popoverShown: boolean = false;

  constructor(
    private imageCompress: NgxImageCompressService,
    private photosService: PhotosService,
    private toastr: NbToastrService,
    private dialogService: NbDialogService
  ) {
    this.photoDescription = ""
    this.thumbnailFiles = new Array<CompressedPhoto>();
    this.bigImages = new Array<CompressedPhoto>();


  }

  ngOnInit() {

  }

  filesSelected(event) {
      this.file = event.target.files;
    this.compressingImages = true;

      for (var i = 0; i < this.file.length; i++) {

        this.setupFileReader(this.file[i]);
        console.log('file', this.file[i]);
      }
  }

  setupFileReader(file) {
    if(file) {
      let fileName = file.name;
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.photosService.getOrientation(file).then((orientation) => {
          console.log(orientation);
          // compressing the big image
          this.photosService.compressFile(this.localUrl, fileName, orientation, 80).then(compressedFile => {
            console.log(compressedFile)
            if(compressedFile) {
              this.bigImages.push(compressedFile);
              this.compressingImages = false;
            }
          }).catch(err => {
            console.log(err);
            this.toastr.danger(err.message, err.status);
          })

          //compressing the thumbnail image
          this.photosService.compressFile(this.localUrl, fileName, orientation, 40).then(compressedFile => {
            if(compressedFile) {
              this.thumbnailFiles.push(compressedFile);
              this.compressingImages = false;
            }
          }).catch(err => {
            console.log(err);
            this.toastr.danger(err.message, err.status);
          })
        })
      }
      reader.readAsDataURL(file);
    }
  }

  upload(form) {
    let formData: FormData = new FormData();


    let headers = new Headers();
    headers.append('enctype', 'multipart/form-data');

    formData.append('subject', this.subject);
    formData.append('classYear', this.classYear);
    if(this.subject === "STR") {
      formData.append('group', this.photoDescription);
    }
    for (let i = 0; i < this.thumbnailFiles.length; i++) {
      formData.append(`thumbnail${i}`, this.thumbnailFiles[i].blob, `th_${this.thumbnailFiles[i].fileName};orientation=${this.thumbnailFiles[i].orientation}`);
    }
    for (let i = 0; i < this.bigImages.length; i++) {
      formData.append(`file${i}`, this.bigImages[i].blob, `${this.bigImages[i].fileName};orientation=${this.bigImages[i].orientation}`);
    }

    this.photosService.upload(formData, headers).subscribe(data => {
      this.loadImages.emit();
      this.thumbnailFiles = new Array<CompressedPhoto>();
      this.classYear = undefined;
      form.reset();
    }, err => {
      this.toastr.danger(err.stringify(), 'Chyba')
    })
  }

  removeImage(position) {
    this.thumbnailFiles.splice(position,1);
  }

  disableFileInput() {
    return this.subject === "STR" && this.thumbnailFiles.length > 2;
  }

  disableSubmit() {
    return !!((this.subject === "STR" && !this.photoDescription) || this.thumbnailFiles.length === 0);
  }

}
