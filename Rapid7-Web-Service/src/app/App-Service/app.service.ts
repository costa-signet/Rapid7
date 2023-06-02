import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, find, map, Observable, of, tap, throwError } from "rxjs";
import { Card } from "./Card";
import { Lookup } from "./Lookup";
import { Rapid7 } from "./Rapid7";
import { Reports } from "./Reports";

@Injectable({
    providedIn: 'root'
})
//Service to load app component
export class AppService{
    private CARD_URL = 'assets/cards.json';
    private LOOKUP_URL = 'assets/lookups.json';
    private LIST_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/list';
    private RAPID7_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/2023-05-02-rapid7/report';
    private CHARTS_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/2023-05-02-rapid7/charts';

    private cardSelctionSubject = new BehaviorSubject<number>(0);
    private lookupSelctionSubject = new BehaviorSubject<number>(0);
    private reportSelctionSubject = new BehaviorSubject<string>('');
    //for charts
    private cardNameSelectionSubject = new BehaviorSubject<string>('');

    constructor (private http: HttpClient) { }

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

    reports$ = this.http.get<Reports[]>(this.RAPID7_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );

    reportSelectionAction$ = this.reportSelctionSubject.asObservable();

    selectedReport$ = combineLatest([this.reports$, this.reportSelectionAction$])
        .pipe(
            map(([reports, selectedReportName]) => 
                reports.find(report => report.file === selectedReportName)),
            tap(report => console.log('yes selected report', report))
    );
   
    selectedReportChange(selectedReportName: string): void{ 
        this.reportSelctionSubject.next(selectedReportName);
        console.log('selected report name ', this.reportSelctionSubject.value);
    }

    report$ = this.http.get<Rapid7[]>(this.RAPID7_URL).pipe(
        tap(data => console.log('All: ', JSON.stringify(data))), 
        catchError(this.handleError)
    );

    selectionAction$ = this.cardNameSelectionSubject.asObservable();

    selectedChart$ = combineLatest([this.report$, this.selectionAction$])
    .pipe(
        map(([charts, selectedChartName]) => 
            charts.find(chart => chart.attribute === selectedChartName)),
        tap(chart => console.log('selected chart', chart))
    );

    selectedTop20$ = combineLatest([this.report$, this.selectionAction$])
        .pipe(
            map(([top20s, selectedTop20Name]) => 
                top20s.find(top20 => top20.attribute === selectedTop20Name)),
            tap(top20 => console.log('selected top20', top20))
    );
   
    selectedChartChange(selectedChartName: string): void{ 
        this.cardNameSelectionSubject.next(selectedChartName);
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