import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {Post} from "../../../@core/data/post";

@Component({
  selector: 'ngx-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  post: Post;
  title: string;

  constructor(public dialogRef: NbDialogRef<DeleteConfirmationComponent>) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.title = this.post ? this.post.title : '';
  }

}
