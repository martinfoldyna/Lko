import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import {Input} from '@angular/core';
import {PostService} from '../post.service';
import {PhotosService} from "../../photos/photos.service";

@Component({
  templateUrl: 'window-edit.component.html',
  styleUrls: ['window-edit.component.scss'],
})
export class WindowEditComponent implements OnInit{
  @Input() article: any;

  newArticle;
  articleWasUpdated = false;
  constructor(
    public dialogRef: NbDialogRef<WindowEditComponent>,
    private articlesService: PostService,
    private toastr: NbToastrService
  ) {

  }

  fetchingData = false;

  ngOnInit() {
    this.newArticle = {
      _id: this.article._id,
      title: this.article.title,
    };

    if(this.article.url) {
      this.newArticle.url = this.article.url;
    }
  }

  close() {
    this.dialogRef.close();
  }

  onKeyUp(textarea?) {
    this.articleWasUpdated = (this.newArticle.title !== this.article.title || textarea.value !== this.article.body);
    if(textarea) this.newArticle.body = textarea.value;
  }

  edit() {
    this.fetchingData = true;
    this.articlesService.updateArticle(this.newArticle).subscribe(data => {
      if (data) {
        this.fetchingData = false;
        this.toastr.success('', `Příspěvek \"${this.newArticle.title}\" upraven!`)
        this.dialogRef.close(true);
      }
    }, err => {
      this.fetchingData = false;
      this.dialogRef.close(false);
    });
  }
}
