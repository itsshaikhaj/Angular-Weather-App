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
        console.log('this.countryInfo :', this.countryInfo);
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  onChangeCountry(countryValue) {
  console.log(' $$$$$$$$$$$:', );
  console.log('countryValue :', countryValue);
    this.stateInfo=this.countryInfo[countryValue].States;
    console.log('this.stateInfo :', this.stateInfo);
    this.cityInfo=this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  }

  onChangeState(stateValue) {
    this.cityInfo=this.stateInfo[stateValue].Cities;
    console.log('this.cityInfo :', this.cityInfo);
    //console.log(this.cityInfo);
  }

  onChangeCity(city) {
  console.log('city :', city);
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([city]);
    });
  }
}
