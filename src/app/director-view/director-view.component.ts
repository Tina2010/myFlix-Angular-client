/**
 * This is the doc comment for ./director-view.component
 *
 * @module DirectorView-Component
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})


export class DirectorViewComponent implements OnInit {

/**
 * The directors name and bio is forwarded to the director-dialog, when "Director" is clicked on the movie-card.
 */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
    }
  ) {}

  ngOnInit(): void {}
}