import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  // 5b50de117af42326fb5efbc2b21f1df0
  private APP_ID : string = '5b50de117af42326fb5efbc2b21f1df0';
  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<any> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.APP_ID}`;
    return this.http.get<any>(path).pipe(
      map(data => ({
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })),
    );
  }
}
