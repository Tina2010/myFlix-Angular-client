/**
 * This is the doc comment for ./synopsis-view.component
 *
 * @module SynopsisView-Component
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {

/**
 * The title and description of a movie is forwarded to the synopsis-dialog, when "Synopsis" is clicked on the movie-card.
 */
  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      description: string
    }
  ) { }

  ngOnInit(): void {
  }

}