import { Component, OnInit, Input } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      public snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
    }

    userLogin(): void {
      this.fetchApiData.userLogin(this.userData).subscribe((result) => {
        this.dialogRef.close();
        this.snackBar.open(result, 'ok', {
          duration: 2000
        });
      }, (result) => {
        this.snackBar.open(result, 'ok', {
          duration: 2000
        })
      })
    }

}
