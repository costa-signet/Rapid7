import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { CardService } from '../Services/card.service';
import { ChartDisplayService } from './chart-display.service';

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.css']
})
export class ChartDisplayComponent{
    errorMessage='selection error';
    title = 'Rapid7-Web-Service';
    
    constructor(private cardService: CardService, private chartDisplayService: ChartDisplayService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

    card$ = this.cardService.selectedCard$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
}