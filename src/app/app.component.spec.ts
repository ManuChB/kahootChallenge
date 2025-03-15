import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CountryService } from './service/country.service';
import { of } from 'rxjs';

/**
 * Mock data for testing
 */
const mockCountries = [
  { name: { common: 'Country A' }, capital: ['Capital A'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 1000000, region: 'Region A', timezones: ['UTC+1'] },
  { name: { common: 'Country B' }, capital: ['Capital B'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+2'] },
  { name: { common: 'Country C' }, capital: ['Capital C'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+3'] },
  { name: { common: 'Country D' }, capital: ['Capital D'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+4'] },
  { name: { common: 'Country E' }, capital: ['Capital E'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+5'] },
  { name: { common: 'Country F' }, capital: ['Capital F'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+6'] },
  { name: { common: 'Country G' }, capital: ['Capital G'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+7'] },
  { name: { common: 'Country H' }, capital: ['Capital H'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+8'] },
  { name: { common: 'Country I' }, capital: ['Capital I'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+9'] },
  { name: { common: 'Country J' }, capital: ['Capital J'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+10'] },
  { name: { common: 'Country K' }, capital: ['Capital J'], currencies: {}, demonyms: {}, flags: { png: '' }, population: 2000000, region: 'Region B', timezones: ['UTC+11'] }
];

/**
 * Mock CountryService
 */
const mockCountryService = {
  getAllCountries: jest.fn(() => of(mockCountries))
};

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: CountryService, useValue: mockCountryService }
      ]
    });
    component = TestBed.inject(AppComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize country list on ngOnInit', () => {
    component.ngOnInit();
    expect(component.countryList().length).toBe(mockCountries.length);
  });

  it('should update paginated list on initialization', () => {
    component.ngOnInit();
    expect(component.paginatedCountryList.length).toBeGreaterThan(0);
  });

  it('should toggle country expansion', () => {
    const country = mockCountries[0];
    component.toggleCountry(country);
    expect(component.expandedCountry).toBe(country);

    component.toggleCountry(country);
    expect(component.expandedCountry).toBeNull();
  });

  it('should increase offset when moving to next page', () => {
    component.ngOnInit();
    const initialOffset = component.offset();
    component.nextPage();
    expect(component.offset()).toBe(initialOffset + component.limit());
  });

  it('should decrease offset when moving to previous page', () => {
    component.ngOnInit();
    component.nextPage();
    const newOffset = component.offset();
    component.prevPage();
    expect(component.offset()).toBe(newOffset - component.limit());
  });
});
