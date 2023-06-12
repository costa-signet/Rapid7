import { Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { AppService } from 'src/app/App-Service/app.service';

@Component({
  selector: 'app-rapid7-select',
  templateUrl: './rapid7-select.component.html',
  styleUrls: ['./rapid7-select.component.css']
})
export class Rapid7SelectComponent {
  errorMessage = '';
  selectedReport: string = '';
  constructor(private appService: AppService) { }

  list$ = this.appService.reports$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

   
    
    output(){
        console.log('reprot selected', this.selectedReport)
        this.appService.selectedReportChange(this.selectedReport);
    }
}