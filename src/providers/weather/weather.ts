import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Placeholder declaration allows data to be loaded from env.js (WEATHER_API_KEY) without encountering "name not found" error
declare const WEATHER_API_KEY: any;

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  weatherApiKey: string = WEATHER_API_KEY;

  constructor(public http: HttpClient) {
    console.log('Hello WeatherProvider Provider');
  }

  getWeather(city: string, unit: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${this.weatherApiKey}`);
  }

}
