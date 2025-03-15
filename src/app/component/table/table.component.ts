import { Component, input, output } from '@angular/core';
import Country from '../../model/country.model';


/**
 * Component that displays a table with the countries.
 * The component allows pagination, expansion of a country, and displaying details like currency and demonyms.
 */
@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  countries = input<Country[]>([]);
  expandedCountry = input<Country | null>(null);
  totalPages = input<number>(1);
  currentPage = input<number>(1);
  toggleCountry = output<Country>();
  prevPage = output<void>();
  nextPage = output<void>();

  /**
   * Concat all the currencies of a country.
   * @param country The country whose currencies are to be displayed.
   * @returns String containing all the currencies.
   */
  getCurrency(country: Country): string {
    return country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A';
  }

  /**
   * Concat all the demonyms of a country.
   * @param country The country whose demonyms are to be displayed.
   * @returns String containing all the demonyms.
   */
  getDemonym(country: Country): string {
    return country.demonyms ? country.demonyms['eng'].f || country.demonyms['eng'].m || 'N/A' : 'N/A';
  }
}
