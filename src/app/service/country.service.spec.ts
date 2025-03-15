import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CountryService } from './country.service';
import Country from '../model/country.model';
import { provideHttpClient } from '@angular/common/http';

describe('CountryService', () => {
    let service: CountryService;
    let httpMock: HttpTestingController;

    const mockCountries: Country[] = [
        { name: { common: 'Argentina' }, capital: ['Buenos Aires'], currencies: { ARS: { name: 'Peso' } }, demonyms: {}, flags: { png: '' }, population: 45000000, region: 'Americas', timezones: ['UTC-3'] },
        { name: { common: 'Brazil' }, capital: ['Brasília'], currencies: { BRL: { name: 'Real' } }, demonyms: {}, flags: { png: '' }, population: 211000000, region: 'Americas', timezones: ['UTC-3'] }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [CountryService,
                provideHttpClient(),
                provideHttpClientTesting()]
        });
        service = TestBed.inject(CountryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch countries from the API and cache them', () => {
        service.getAllCountries().subscribe(countries => {
            expect(countries.length).toBe(2);
            expect(countries[0].name.common).toBe('Argentina');
            expect(service['cache'].length).toBe(2);
        });

        const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
        expect(req.request.method).toBe('GET');
        req.flush(mockCountries);
    });

    it('should return cached data without making an API call', () => {
        service['cache'] = mockCountries;

        service.getAllCountries().subscribe(countries => {
            expect(countries.length).toBe(2);
        });

        httpMock.expectNone('https://restcountries.com/v3.1/all'); 
    });
});
