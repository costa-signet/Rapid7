import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { DisplayComponent } from './Display/display.component';
import { CardService } from './Services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rapid7-Web-Service';
  errorMessage: any;

  constructor (private dialog: MatDialog, private cardService: CardService){}

  cards$ = this.cardService.cards$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  
  onSelected(id: number): void{
    this.cardService.selectedCardChange(id);
  }

  openDialog(cardId: number) {
    this.dialog.open(DisplayComponent, {
      width: '75%',
      height: '75%',
      data: {id: cardId}
    });
  } 
}