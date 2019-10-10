import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap, delay} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServiceloginService {
    apiUrl = 'http://merchussoft.online/newwspysltda/public';

    // apiUrl = 'http://127.0.0.1:8080/ws_newpyslda/public/index.php';

    constructor(private http: HttpClient) {
    }

    private log(message: string) {
        console.log(message);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }

    login(data) {
        return this.http.post(this.apiUrl + '/api_pys/login', data)
            .pipe(delay(1000),
                catchError(this.handleError('login', []))
            );
    }

    reportHoursUser(card: number) {
        return this.http.get(this.apiUrl + '/api_pys/reportslist/' + card)
            .pipe(delay(1000),
                catchError(this.handleError('login', []))
            );
    }

    routes(card: number) {
        return this.http.get(this.apiUrl + '/api_pys/routers/' + card)
            .pipe(
                catchError(this.handleError('login', []))
            );
    }


}
