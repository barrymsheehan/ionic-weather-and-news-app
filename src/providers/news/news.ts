import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Placeholder declaration allows data to be loaded from env.js (NEWS_API_KEY) without encountering "name not found" error
declare const NEWS_API_KEY: any;

/*
  Generated class for the NewsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsProvider {

  pageSize: number = 5;
  newsApiKey: string = NEWS_API_KEY;

  constructor(public http: HttpClient) {
    console.log('Hello NewsProvider Provider');
  }

  getNews(country: string): Observable<any> {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${this.pageSize}&apiKey=${this.newsApiKey}`);
  }

}
