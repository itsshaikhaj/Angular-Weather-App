import { CountriesService } from './countries.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stateInfo: any = [];
  countryInfo: any[] = [];
  cityInfo: any = [];

  constructor(private router: Router, private country: CountriesService) { }

  ngOnInit() {
    this.getCountries();
    // this.cityControl = new FormControl('');
    // this.cityControl.valueChanges
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(value => {
    //     this.router.navigate([value]);
    //   });

    // this.countryControl = new FormControl('');

    // this.cities$ = this.countryControl.valueChanges.pipe(
    //   map(country => country.cities)
    // );
  }

  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }

  getCountries(){
    this.country.allCountries().
    subscribe(
      data2 => {
        this.countryInfo=data2.Countries;
      },
    )
  }

  onChangeCountry(countryValue) {
    this.stateInfo=this.countryInfo[countryValue].States;
    this.cityInfo=this.stateInfo[0].Cities;
  }

  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].Cities;
  }

  onChangeCity(city) {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([city]);
    });
  }
}
