/**
 * This is the doc comment for ./welcome-page.component
 *
 * @module WelcomePage-Component
 */

import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  title = 'myFlix-Angular-client';
  
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
  }

/**
 * Opens the registration dialog.
 */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '480px'
    });
  }

/**
 * Opens the login dialog.
 */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      width: '480px'
    })
  }
}
