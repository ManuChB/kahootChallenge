import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Country from '../model/country.model';

/**
 * Service to fetch country data from the REST API and cache results.
 */
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private cache: Country[] = [];

  /**
   * Constructor for CountryService.
   * @param http HttpClient for making API calls.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves all countries from the API.
   * Uses caching to avoid unnecessary API calls.
   * @returns Observable of an array of Country objects.
   */
  getAllCountries(): Observable<Country[]> {
    if (this.cache.length) {
      return new Observable(observer => {
        observer.next(this.cache);
        observer.complete();
      });
    } else {
      return this.http.get<Country[]>(this.apiUrl).pipe(
        tap(countries => this.cache = countries.sort((a, b) => a.name.common.localeCompare(b.name.common)))
      );
    }
  }
}
