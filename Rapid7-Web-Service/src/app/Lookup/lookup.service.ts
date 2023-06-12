import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, combineLatest, find, map, Observable, of, tap, throwError } from "rxjs";
import { AssetKeyLookup } from "../App-Service/AssetKeyLookup";

@Injectable({
    providedIn: 'root'
})
//Service to load app component
export class LookupService{
    private ASSET_KEY_LOOKUP = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/asset-lookup/2023-05-02-rapid7/';

    constructor (private http: HttpClient) { }
    //List of possible files
    lookupAction(asset_name: string){
        return this.http.get<AssetKeyLookup[]>(this.ASSET_KEY_LOOKUP + asset_name).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))), 
            catchError(this.handleError)
        );

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