import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, map, tap, throwError } from "rxjs";
import { Card } from "./Card";

@Injectable({
    providedIn: 'root'
})

export class CardService{
    private URL = 'assets/cards.json';

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