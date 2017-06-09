import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.put('https://hackathonphase2.firebaseio.com/data.json', servers, { headers: headers });
  }

  getServers() {
    return this.http.get('https://hackathonphase2.firebaseio.com/data').map(
      (response : Response) => {
        const data = response.json();
        for(const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      }
    ).catch(
      (error: Response) => {
        return Observable.throw('SOMETHING WENT WRONG');
      }
    );
  }

  getAppName() {
    return this.http.get('https://hackathonphase2.firebaseio.com/appName.json').map(
      (response : Response) => {
        return response.json();
      }
    );
  }

}
