import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { ChartDisplayComponent } from './Resources/ProgressCharts/chart-display.component';
import { AppService } from './App-Service/app.service';
import { Top20DisplayComponent } from './Resources/Top20/top20-display.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rapid7-Web-Service';
  errorMessage: any;
  menu: any;
    
  constructor (private dialog: MatDialog, private appService: AppService){}

  cards$ = this.appService.cards$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  lookups$ = this.appService.lookups$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  
  onSelected(id: number): void{
    this.appService.selectedCardChange(id);
  }
  
  onSelectedLookup(id: number): void{
    this.appService.selectedLookupChange(id)
  }

  onSelectedCard(name: string): void {
    this.appService.selectedCardNameChanged(name);
  }

  openDialog(cardId: number) {
    if (cardId == 1 || cardId == 2 || cardId == 3){
      this.dialog.open(ChartDisplayComponent, {
        width: '80%',
        height: '90%',
        data: {id: cardId}
      });
    }
    else if (cardId == 4 || cardId == 5){
      this.dialog.open(Top20DisplayComponent, {
        width: '80%',
        height: '90%',
        data: {id: cardId}
      });
    }
    
  } 

  openLookup(id: number){
    console.log('clicked with id:', id)
  }

}