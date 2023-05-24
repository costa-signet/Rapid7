import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
//HTTP request happens directly in html for now
export class ChartDisplayService{
    private API_URL = 'https://kbt9dzwcd4.execute-api.us-east-2.amazonaws.com/item/';

    constructor (private http: HttpClient) { }
    
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