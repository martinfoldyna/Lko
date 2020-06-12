import { Component, OnInit, Input } from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {User} from "../../../@core/data/users";
import {UserService} from "../user.service";

@Component({
  selector: 'ngx-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input('user') user: User;
  newUser: User;
  updatingUser: boolean = false;
  userWasUpdated: boolean = false;

  constructor(
    public dialogRef: NbDialogRef<UserEditComponent>,
    private userService: UserService,
    private toastr: NbToastrService
  ) { }

  ngOnInit() {
    this.newUser = this.user;
  }

  onKeyUp() {
    this.userWasUpdated = (JSON.stringify(this.user) === JSON.stringify(this.newUser));

  }

  edit() {
    this.updatingUser = true;
    this.userService.update(this.user._id, this.newUser).subscribe(response => {
      if (response) {
        this.toastr.success('', response.code.message);
        this.updatingUser = false;
        this.dialogRef.close();
      } else {
        this.toastr.warning('', 'Během odesílání se stala chyba.');
      }
    }, err => {
      console.log(err);
      this.updatingUser = false;
      this.toastr.warning('', err.error.code.message);
    })
  }

}
