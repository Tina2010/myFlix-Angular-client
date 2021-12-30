import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

   @Input() userData = { Username: localStorage.getItem('user'), Password: '', Email: '', Birthday: '' };

   constructor(
     public fetchUserData: UserRegistrationService,
     public dialogRef: MatDialogRef<UpdateUserComponent>,
     public snackBar: MatSnackBar,
   ) { }
 
   ngOnInit(): void {
   }
 
   editUserInfo(): void {
     this.fetchUserData.updateUser(this.userData).subscribe(
       (res) => {
         this.dialogRef.close();
         localStorage.setItem('user', res.Username);
         this.snackBar.open('Profile updated successfully!', 'Ok', {
           duration: 2000,
         });
       },
       (res) => {
         console.log(res);
         this.snackBar.open(res, 'Ok', {
           duration: 2000,
         });
       }
     );
 
     setTimeout(function () {
       window.location.reload();
     }, 1000);
 
   }
 }