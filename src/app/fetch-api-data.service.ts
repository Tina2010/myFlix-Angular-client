import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// adding token check for user authorization
const token = localStorage.getItem('token');
const headers = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + token,
  }),
};


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://obscure-castle-33842.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})


export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /* --------------------------------------------------------- */
 // Making the api call for the User registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /* --------------------------------------------------------- */
 // Making the api call for the User login endpoint
 public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
  catchError(this.handleError)
  );
}

  /* --------------------------------------------------------- */
 // Making the api call for the Get all movies endpoint
 public showAllMovies(): Observable<any> {
  return this.http.get(apiUrl + 'movies', headers).pipe(
  catchError(this.handleError)
  );
}

  /* --------------------------------------------------------- */
 // Making the api call for the Get one movie endpoint
 public showOneMovie(movieID: string): Observable<any> {
  return this.http.get(apiUrl + 'movies' + movieID, headers).pipe(
    catchError(this.handleError)
    );
}

   /* --------------------------------------------------------- */
 // Making the api call for the Get director endpoint
 public showMoviesDirector(directorDetails: any): Observable<any> {
  console.log(directorDetails);
  return this.http.get(apiUrl + 'movies/:Title/director', directorDetails).pipe(
  catchError(this.handleError)
  );
}

   /* --------------------------------------------------------- */
 // Making the api call for the Get genre endpoint
 public showMoviesGenre(genreDetails: any): Observable<any> {
  console.log(genreDetails);
  return this.http.get(apiUrl + 'movies/:Title/genre', genreDetails).pipe(
  catchError(this.handleError)
  );
}

   /* --------------------------------------------------------- */
 // Making the api call for the Get user endpoint
 public showSingleUser(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.get(apiUrl + 'users/:Username', userDetails).pipe(
  catchError(this.handleError)
  );
}

    /* --------------------------------------------------------- */
 // Making the api call for the Get favourite movies for a user endpoint
 // ATTENTION: I didnt use a path, but a specific call to get the favorite movies for one user: https://github.com/Tina2010/myFlix-Client/blob/main/src/components/profile-view/profile-view.jsx#L35
 public showFavMovieOfSingleUser(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.get(apiUrl + 'users/:Username', userDetails).pipe(
  catchError(this.handleError)
  );
}

    /* --------------------------------------------------------- */
 // Making the api call for the Add a movie to favourite Movies endpoint
 public addMovieToFavorites(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + '/users/:Username/movies/:MovieID', userDetails).pipe(
  catchError(this.handleError)
  );
}

    /* --------------------------------------------------------- */
 // Making the api call for the Edit user endpoint
 public updateUser(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.put(apiUrl + '/users/:Username', userDetails).pipe(
  catchError(this.handleError)
  );
}

    /* --------------------------------------------------------- */
 // Making the api call for the Delete user endpoint
 public deleteUser(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.delete(apiUrl + '/users/:Username', userDetails).pipe(
  catchError(this.handleError)
  );
}

    /* --------------------------------------------------------- */
 // Making the api call for the Delete a movie from the favorite movies endpoint
 public removeMovieFromFavorites(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.delete(apiUrl + '/users/:Username/movies/:MovieID', userDetails).pipe(
  catchError(this.handleError)
  );
}


private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
  console.error('Some error occurred:', error.error.message);
  } else {
  console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
  }
  return throwError(
  'Something bad happened; please try again later.');
}
}