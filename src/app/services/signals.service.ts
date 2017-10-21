import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { Injectable, Inject, Injector} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignalsApiService {
    private apiEndpoint = 'https://evening-savannah-67907.herokuapp.com';
    private http: Http;
    protected headers: Headers;

    constructor(injector: Injector) {
        this.http = injector.get(Http);
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }


    public get(userName: string){
        return this.http
            .get(`${this.apiEndpoint}/api/v1/sys/signals/${userName}`)
            .map(r => r.json())
            .catch(this.handleError);
    }    


    public put(entity) {
        let body = JSON.stringify(entity);

        return this.http
            .put(`${this.apiEndpoint}/api/v1/sys/signals/`, body, { headers: this.headers })
            .map(r => r.json())
            .catch(this.handleError);
    }

   
    private handleError(error: Response | any) {
        if (error instanceof Response) {
            let body: any;
            try {
                body = error.json();
            } catch (e) {
                body = '';
            }
            const err = body.error || body;
            return Observable.throw({
                message: err || (error.statusText || ''),
                statusCode: error.status
            });
        } else {
            return Observable.throw({
                message: error.message ? error.message : error.toString()
            });
        }
    }

}