/**
 * This is the doc comment for ./user-registration-form.component
 *
 * @module UserRegistrationForm-Component
 */

import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor
    (
      public fetchApiData: UserRegistrationService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar
    ) {}


  ngOnInit(): void {
  }

/**
 * User is able to register.
 */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // console.log(result)
      this.dialogRef.close();
      this.snackBar.open('User registration successful', 'Ok', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('Something went wrong, please try again!', 'Ok', {
        duration: 2000
      });
    });
  }
}
