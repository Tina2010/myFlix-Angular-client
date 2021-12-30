/**
 * This is the doc comment for ./toolbar.component
 *
 * @module Toolbar-Component
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

/**
 * User is able to log out from the myFlix-website. The 'user' and 'token' will be removed from the localstorage. After that the user is navigated to the welcome page.
*/
  logOutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']).then(() => {
    });
  }
}
