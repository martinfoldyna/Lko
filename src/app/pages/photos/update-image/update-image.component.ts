import { Component, OnInit, Input } from '@angular/core';
import {Image} from "../../../@core/data/image";
import {NbDialogRef, NbToastrService} from "@nebular/theme"
import {PhotosService} from "../photos.service";

@Component({
  selector: 'ngx-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss']
})
export class UpdateImageComponent implements OnInit {

  @Input() image: Image;
  @Input() imageTypes: Array<string>
  newImage: Image;
  imageWasUpdated: boolean = false;
  newImageType: boolean = false;

  constructor(
    public dialogRef: NbDialogRef<UpdateImageComponent>,
    public photosService: PhotosService,
    private toastr: NbToastrService
  ) { }

  ngOnInit() {
    this.newImage = this.image;
  }


  edit() {
    this.image.filename = this.newImage.filename.replace(/ /g,'_');
    this.image.description = this.newImage.description;
    this.image.type = this.newImage.type;

    this.dialogRef.close(this.image);
  }

}
