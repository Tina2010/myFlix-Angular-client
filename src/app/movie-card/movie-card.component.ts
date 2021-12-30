/**
 * This is the doc comment for ./movie-card.component
 *
 * @module MovieCard-Component
 */

import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  //Getting the user info from localStorage if present
  user: any = localStorage.getItem('user');
  movies: any[] = [];
  favoriteMovies: any[] = [];


  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.getMovies();
    this.getUserFavs();
  }

/**
 * Call all movies from the myFlix API.
 */
  getMovies(): void {
    this.fetchApiData.showAllMovies().subscribe((res: any) => {
      this.movies = res;
      return this.movies;
    });
  }

/**
  * Opens the genre dialog
 */  
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '500px',
    });
  }

/**
  * Opens the director dialog
*/ 
  openDirectorDialog(
    name: string,
    bio: string
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        name,
        bio
      },
      width: '500px',
    });
  }

/**
  * Opens the synopsis dialog
*/ 
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description},
    })
  }

/**
  * Pull the FavoriteMovies of one user to display an empty or filled heart, wether the like a movie or not.
  * 
  * @const user Provide user for the API call.
  * @returns A list of the users favorite movies.
*/ 
  getUserFavs(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.showSingleUser(user).subscribe((res: any) => {
      this.favoriteMovies = res.FavoriteMovies;
      return this.favoriteMovies;
    });
  }

/**
  * User is able to add a movie to their favorites.
*/ 
  addToFavs(movieId: any,) {
    // console.log(movieId);
    this.fetchApiData.addMovieToFavorites(movieId).subscribe((resp: any) => {

      console.log(resp);
      this.snackBar.open(`The selected movie has been added to your favorites.`, 'OK', {
        duration: 3000,
      });
      this.getUserFavs();
    });
  }

/**
  * User is able to remove a movie from their favorites.
*/ 
  removeFavoriteMovie(id: string, Title: string): void {
    this.fetchApiData.removeMovieFromFavorites(id).subscribe((resp: any) => {

      // console.log(resp);
      this.snackBar.open(`The selected movie has been removed from your favorites.`, 'OK', {
        duration: 3000,
      });
      this.getUserFavs();
    });
  }

/**
  * Update the heart icon on the movie card to be checked, if a movie is a favorite or not.
*/ 
  setFavoriteStatus(id: any): any {
    if (this.favoriteMovies.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}