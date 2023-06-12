import { Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { LookupService } from './lookup.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html'
})
export class LookupComponent{
    errorMessage='selection error';
    
    constructor(private lookupService: LookupService) { }

    assetName$ = this.lookupService.lookupAction('WINECC01')
}