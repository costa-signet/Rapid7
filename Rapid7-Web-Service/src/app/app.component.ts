import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { ChartDisplayComponent } from './Resources/ProgressCharts/chart-display.component';
import { AppService } from './App-Service/app.service';
import { Top20DisplayComponent } from './Resources/Top20/top20-display.component';
import { LookupComponent } from './Lookup/lookup.component';
import { Rapid7SelectComponent } from './Rapid7-Select/rapid7-select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rapid7-Web-Service';
  errorMessage: any;
  menu: any;
  selectedItem: string = '';
    
  constructor (private dialog: MatDialog, private appService: AppService){}

  //selectedRapid7: string = '2023-05-02-rapid7.csv'
  selectedRapid7$ = this.appService.selectedReport$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

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

  list$ = this.appService.reports$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    chart$ = this.appService.urls$
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
    this.dialog.open(LookupComponent, {
      width: '80%',
      height: '90%,'
    });
    console.log('clicked with id:', id)
  }

  openReportDialog(){
    this.dialog.open(Rapid7SelectComponent , {
      width: '50%',
      height: '50%'
    });
  }

}