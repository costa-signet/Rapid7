import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, Observable, tap, throwError } from "rxjs";
import { Card } from "./Card";
import { Data } from "./Data";

@Injectable({
    providedIn: 'root'
})

export class CardService{
    private URL = 'assets/cards.json';
    private API_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/item/';

    private cardSelctionSubject = new BehaviorSubject<number>(0);

    constructor (private http: HttpClient) { }

    cards$ = this.http.get<Card[]>(this.URL).pipe(
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

    setID(id: number): Observable<Data> {
        return this.http.get<Data>(this.API_URL + id)
            .pipe(
                tap(data => console.log('Content: ', JSON.stringify(data))), 
                catchError(this.handleError)
            ); 
    }
    selectedCardChange(selectedCardId: number): void{ 
        this.cardSelctionSubject.next(selectedCardId);
        console.log('selected post id ', this.cardSelctionSubject.value);
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