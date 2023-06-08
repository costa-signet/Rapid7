import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, find, map, Observable, of, tap, throwError } from "rxjs";
import { Card } from "./Card";
import { Charts } from "./Charts";
import { Lookup } from "./Lookup";
import { Top20Without } from "./Top20Without";
import { Reports } from "./Reports";
import { Top20With } from "./Top20With";

@Injectable({
    providedIn: 'root'
})
//Service to load app component
export class AppService{
    private CARD_URL = 'assets/cards.json';
    private LOOKUP_URL = 'assets/lookups.json';
    private LIST_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/list';
    //private RAPID7_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/full-report/2023-05-02-rapid7';
    private CHARTS_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/charts/2023-05-02-rapid7';
    private TOP20_WITH_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/top20-with-details/2023-05-02-rapid7';
    private TOP20_WITHOUT_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/top20-without-details/2023-05-02-rapid7';

    private cardSelctionSubject = new BehaviorSubject<number>(0);
    private cardNameSelectionSubject = new BehaviorSubject<string>('');
    private lookupSelctionSubject = new BehaviorSubject<number>(0);

    constructor (private http: HttpClient) { }
    //List of possible files
    reports$ = this.http.get<Reports[]>(this.LIST_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    
    //Cards stored locally in json
    cards$ = this.http.get<Card[]>(this.CARD_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );

    cardSelectionAction$ = this.cardSelctionSubject.asObservable();

    selectedCard$ = combineLatest([this.cards$, this.cardSelectionAction$])
        .pipe(
            map(([cards, selectedCardId]) => 
                cards.find(card => card.id === selectedCardId)),
            tap(card => console.log('selected card', card))
    );
   
    selectedCardChange(selectedCardId: number): void{ 
        this.cardSelctionSubject.next(selectedCardId);
        console.log('selected post id ', this.cardSelctionSubject.value);
    }
    //lookups stored locally in json
    lookups$ = this.http.get<Lookup[]>(this.LOOKUP_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );

    lookupSelectionAction$ = this.lookupSelctionSubject.asObservable();

    selectedLookup$ = combineLatest([this.lookups$, this.lookupSelectionAction$])
        .pipe(
            map(([lookups, selectedLookupID]) => 
                lookups.find(lookup => lookup.id === selectedLookupID)),
            tap(lookup => console.log('selected lookup', lookup))
    );
   
    selectedLookupChange(selectedLookupID: number): void{ 
        this.lookupSelctionSubject.next(selectedLookupID);
        console.log('selected post id ', this.lookupSelctionSubject.value);
    }

    //Presigned URL observable
    urls$ = this.http.get<Charts[]>(this.CHARTS_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    //Top20 With Key Details
    top20Withs$ = this.http.get<Top20With[]>(this.TOP20_WITH_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );
    //Top20 Without key details
    top20Withouts$ = this.http.get<Top20Without[]>(this.TOP20_WITHOUT_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );

    selectionAction$ = this.cardNameSelectionSubject.asObservable();

    selectedChart$ = combineLatest([this.urls$, this.selectionAction$])
        .pipe(
            map(([urls, selectedCardName]) => 
                urls.find(url => url.chart === selectedCardName)),
            tap(chart => console.log('selected chart', chart))
        );

    selectedTop20With$ = combineLatest([this.top20Withs$, this.selectionAction$])
        .pipe(
            map(([top20Withs, selectedCardName]) => 
                top20Withs.find(top20With => top20With.attribute === selectedCardName)),
            tap(chart => console.log('selected chart', chart))
        );

    selectedTop20Without$ = combineLatest([this.top20Withouts$, this.selectionAction$])
        .pipe(
            map(([top20Withouts, selectedCardName]) => 
                top20Withouts.find(top20Without => top20Without.attribute === selectedCardName)),
            tap(chart => console.log('selected chart', chart))
        );
    
    selectedCardNameChanged(selectedCardName: string): void{ 
        this.cardNameSelectionSubject.next(selectedCardName);
        console.log('selected chart name ', this.cardNameSelectionSubject.value);
    }

    

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occured ${err.error.message}`;
        }
        else 
            errorMessage = `Server returned code:` 
            
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}