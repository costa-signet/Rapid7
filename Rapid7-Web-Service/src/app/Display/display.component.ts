import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { CardService } from '../Services/card.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent{
    errorMessage='selection error';
    
    constructor(private cardService: CardService, @Inject(MAT_DIALOG_DATA) private data: {id: number}) { }

    card$ = this.cardService.selectedCard$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

    cardContent$ = this.cardService.setID(this.data.id)
}