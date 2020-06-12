import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {AuthoriseUser, User} from "../../@core/data/users";
import {NgForm} from "@angular/forms";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'ngx-user',
  template: `
    <ngx-user-authorise (refreshUsers)="overview.loadUsers();" #authorise></ngx-user-authorise>
    <ngx-user-overview (refreshUsers)="authorise.loadUsers()" #overview></ngx-user-overview>
  `,
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
  ) {

  }

  ngOnInit() {
  }

  loadUsers() {

  }

}
