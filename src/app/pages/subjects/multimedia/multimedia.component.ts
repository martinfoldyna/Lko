import { Component, OnInit } from '@angular/core';
import {PostService} from "../../articles/post.service";
import {Video} from "../../../@core/data/video";
import {PhotosService} from "../../photos/photos.service";
import {Post} from "../../../@core/data/post";
import {CompressedPhoto} from "../../../@core/data/photo";
import {Image} from "../../../@core/data/image";
import {NbToastrService} from "@nebular/theme"

@Component({
  selector: 'ngx-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.scss']
})
export class MultimediaComponent implements OnInit {

  deletingImage = false;
  loadingImages = false;
  loadingArticles = false;
  subject = "MME";
  video: Video = {};
  allVideos: [Video];
  allImages: [Image];
  uniqueImageTypes: Array<string>;


  public article;

  constructor(
    private articlesService: PostService,
    private photosService: PhotosService,
    private postService: PostService,
    private toastr: NbToastrService
  ) {
    this.uniqueImageTypes = new Array<string>();
  }

  ngOnInit() {
    this.loadArticles();
    this.loadImages();
  }

  loadArticles() {
    this.loadingArticles = true;
    this.postService.loadArticles(this.subject).subscribe(response => {
      if (response.post) {
        this.loadingArticles = false;
        this.allVideos = response.post;
      } else {
        this.toastr.danger('', 'Něco se pokazilo, zkuste akci opakovat později.')
      }
    })
  }

  loadImages() {
    this.loadingImages = true;
    this.photosService.loadImages(this.subject).subscribe(data => {
      if(data.photos) {
        this.allImages = data.photos;
        if (this.deletingImage === true) this.deletingImage = false;
        this.loadingImages = false;
      } else {
        this.toastr.danger('', 'Něco se pokazilo, zkuste akci opakovat později.')
      }
    }, err => {
      this.toastr.danger(err, 'Během načítání obrázků došlo k chybě');
    })
  }

  getUniqueImageTypes() {
    this.uniqueImageTypes = [...new Set(this.allImages.map(item => item.type))].sort();
  }

  parentFunc() {
    this.loadArticles();
  }

}
