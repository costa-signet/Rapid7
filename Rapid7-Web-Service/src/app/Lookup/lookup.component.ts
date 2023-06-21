import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { LookupDetailsComponent } from './lookup-details.component';
import { LookupService } from './lookup.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent{
    errorMessage='selection error';
    assetName: string = '';
    
    constructor(private lookupService: LookupService, private dialog: MatDialog) { }

    output(){
      console.log('test, ', this.assetName)
      this.dialog.open(LookupDetailsComponent, {
        width: '80%',
        height: '90%',
        data: {id: this.assetName},
      });

    }
   
}