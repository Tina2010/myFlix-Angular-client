/**
 * This is the doc comment for ./user-login.component
 *
 * @module UserLogin-Component
 */

import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor
    (
      public fetchApiData: UserRegistrationService,
      public dialogRef: MatDialogRef<UserLoginComponent>,
      public snackBar: MatSnackBar,
      public router: Router
    ) {}

    ngOnInit(): void {
    }

/**
 * User is able to login on the welcome-page.
 */
    userLogin(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);
        // console.log(result.token);
        this.dialogRef.close();
        this.router.navigate(['movies']).then(() => {
          window.location.reload();
        });
      }, (result) => {
        this.snackBar.open(result, 'ok', {
          duration: 5000
        });
      })
    }

}
