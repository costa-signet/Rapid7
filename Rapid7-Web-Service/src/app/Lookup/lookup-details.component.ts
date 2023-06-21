import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY } from 'rxjs';
import { LookupService } from './lookup.service';

@Component({
  selector: 'app-lookup-deatils',
  templateUrl: './lookup-details.component.html'
})
export class LookupDetailsComponent{
    errorMessage='selection error';
    
    constructor(private lookupService: LookupService, @Inject(MAT_DIALOG_DATA) private data: {id: string}) { }

    assetName$ = this.lookupService.lookupAction(this.data.id)
}