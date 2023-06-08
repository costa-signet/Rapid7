import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { AppService } from '../../App-Service/app.service';


@Component({
  selector: 'app-top20-display',
  templateUrl: './top20-display.component.html',
  styleUrls: ['./top20-display.component.css']
})
export class Top20DisplayComponent{
    errorMessage='selection error';
    
    constructor(private qppService: AppService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

    card$ = this.qppService.selectedCard$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

    top20$ = this.qppService.selectedTop20Without$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

    top20With$ = this.qppService.selectedTop20With$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
}