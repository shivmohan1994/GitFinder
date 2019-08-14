import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from './service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  userName: String;
  users: Array<any>;
  repos: Array<any>;
  userData: Array<any>;
  myControl = new FormControl();
  options: string[] = [];

  constructor(private service: ApiService, private _snackBar: MatSnackBar) { }

  getUser(event: any) {
    if ('Enter' === event.key) {
      this.getUserName(this.userName);
      return;
    }
    let inputValue: any = event.target.value;
    //Search Users 
    this.service.getUserName<any[]>(inputValue).subscribe((data: any[]) => {
      this.users = data;
      this.options = this.users['items'];
    },
      err => {
        this.error(err);
      }
    );
  }

  getUserName(option: any) {
    // Getting User Details using Name as Key 
    this.userName = option.login;
    this.service.getUserData<any[]>(this.userName).subscribe((data: any[]) => this.userData = data,
      err => {
        this.error(err)
      }
    );
    // Getting User Repository details as per user name
    this.service.getUserRepo<any[]>(this.userName).subscribe((data: any[]) => {
      this.repos = data;
      if (this.repos.length == 0) {
        this._snackBar.open('Oops!! No Repository found', 'Undo', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['blue-snackbar']
        });
      }
    },
      err => {
        return this.error(err);
      });
  }

  //Error 
  error(err) {
    if (err.status === 403) {
      this._snackBar.open('Oops!! Server Timeout Error', 'Undo', {
        duration: 2000
      });
    } else {
      this._snackBar.open('Oops!! Something went wrong', 'Undo', {
        duration: 2000
      });
    }
  }

}