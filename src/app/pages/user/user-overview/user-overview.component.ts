import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NbToastrService, NbDialogService} from "@nebular/theme";
import {UserService} from "../user.service";
import {AuthoriseUser} from "../../../@core/data/users";
import {AuthService} from "../../../@core/utils/auth.service";
import {LocalAuthService} from "../../auth/auth.service";
import {UserEditComponent} from "../user-edit/user-edit.component";

@Component({
  selector: 'ngx-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  @Output("refreshUsers") refreshUsers: EventEmitter<any> = new EventEmitter();

  // settings = {
  //   actions: {
  //     add: false
  //   },
  //   edit: {
  //     editButtonContent: '<i class="nb-edit"></i>',
  //     saveButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="nb-fold"></i>',
  //     confirmDelete: true,
  //   },
  //   columns: {
  //     name: {
  //       title: 'Jméno',
  //       type: 'string',
  //       editable: false,
  //     },
  //     email: {
  //       title: 'E-mail',
  //       type: 'string',
  //       editable: false,
  //     },
  //     role: {
  //       title: 'Role',
  //       editor: {
  //         type: 'list',
  //         config: {
  //           selectText: 'Vyberte možnost',
  //           list: [
  //             {value: 'teacher', title:'teacher'},
  //             {value: 'admin', title:'admin'},
  //           ],
  //         },
  //       },
  //       filter: {
  //         type: 'list',
  //         config: {
  //           selectText: 'Vyberte roli',
  //           list: [
  //             {value: 'teacher', title:'teacher'},
  //             {value: 'admin', title:'admin'},
  //           ],
  //         },
  //       },
  //     }
  //   },
  // };

  settings = {
    actions: {
      add: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-close"></i>',
      confirmDelete: true,
    },
    mode: 'external',
    columns: {
      name: {
        title: 'Jméno',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'role'
      }
    },
  };

  allUsers: Array<AuthoriseUser>;

  constructor(
    private userService: UserService,
    private authService: LocalAuthService,
    private toastr: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users.users.filter(user => {
        if(user.state === 'authorised' && user.email !== this.userService.getUser().email) {
          return true;
        } else {
          return false;
        }
      });
    }, err => {
      this.toastr.danger('', err.error)
    })
  }

  onDelete(event) {
    this.authService.deAuthorise(event.data._id).subscribe(response => {
      if(response) {
        console.log(response);
        this.refreshUsers.emit();
        this.loadUsers();
        this.toastr.success('', 'Uživatel byl deautorizován.')
      }
    })
  }

  onEdit(event) {
    this.dialogService.open(UserEditComponent, {context: {
        user: event.data,
      }}).onClose.subscribe(data => {this.loadUsers()})
  }

}
