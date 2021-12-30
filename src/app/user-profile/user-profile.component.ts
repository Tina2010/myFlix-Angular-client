/**
 * This is the doc comment for ./user-profile.component
 *
 * @module UserProfile-Component
 */

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAccordion } from '@angular/material/expansion';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = localStorage.getItem('user');
  movies: any[] = [];
  favoriteMovies: any[] = [];
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  constructor(
    public dialog: MatDialog,
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

/**
 * Gets a single user to display their data on their profile.
 */
  getUser(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.showSingleUser(username).subscribe((res: any) => {
      this.user = res;
      this.getFavoriteMovies();
      // console.log(res);
    });
  }

/**
 * Gets the users favorite movies to display them beneath their personal data in the profile.
 */
  getFavoriteMovies(): void {
    this.fetchApiData.showAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
    });
    // console.log(this.favoriteMovies);
  }

/**
 * Takes away favouring of a movie.
 */
  removeFavoriteMovie(id: string, Title: string): void {
    this.fetchApiData.removeMovieFromFavorites(id).subscribe((resp) => {
      // console.log(resp);
      this.snackBar.open(
        `${Title} has been removed from your favorites!`,
        'OK',
        {
          duration: 2000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

/**
 * User is able to de-register. This removes the 'user' and 'token' from the localstorage.
 */
  deregisterUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      () => {
        this.snackBar.open(
          'Something went wrong, please try later.', 'Ok',
          {
            duration: 2000,
          }
        );
      },
      (result) => {
        this.snackBar.open(`The user ${this.user.Username} has been deregistered`, 'Great', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']).then(() => {
        });
        localStorage.clear();
      }
    );
  }

/**
 * Opens the update dialog for a user to change their personal data.
 */
  openEditUserProfileDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: 'max-content'
    });
  }
}