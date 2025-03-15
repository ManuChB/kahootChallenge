import { Component, computed, OnInit, signal } from '@angular/core';
import Country from './model/country.model';
import { CountryService } from './service/country.service';
import { TableComponent } from "./component/table/table.component";

/**
 * Root component of the application.
 * Manages country data, pagination, and expanded country details.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [TableComponent]
})
export class AppComponent implements OnInit {
  countryList = signal<Country[]>([]);
  paginatedCountryList: Country[] = [];
  expandedCountry: Country | null = null;
  offset = signal<number>(0);
  limit = signal<number>(10);

  currentPage = computed(() => Math.floor(this.offset() / this.limit()) + 1);
  totalPages = computed(() => Math.ceil(this.countryList().length / this.limit()));

  /**
   * Constructor that injects the CountryService for API interactions.
   * @param countryService Service to fetch country data.
   */
  constructor(private countryService: CountryService) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Fetches country data from the API and populates the table.
   */
  ngOnInit() {
    this.countryService.getAllCountries().subscribe(response => {
      this.countryList.set(response);
      this.updatePagination();
    });
  }

  /**
   * Updates the paginated country list based on the current offset and limit.
   */
  updatePagination() {
    this.paginatedCountryList = this.countryList().slice(this.offset(), this.offset() + this.limit());
  }

  /**
   * Expands or collapses the selected country row to show/hide additional details.
   * @param country The country to toggle.
   */
  toggleCountry(country: Country) {
    this.expandedCountry = this.expandedCountry?.name.common === country.name.common ? null : country;
  }

  /**
   * Moves to the next page if there are more countries to display.
   */
  nextPage() {
    if (this.offset() + this.limit() < this.countryList().length) {
      this.offset.update(value => value + this.limit());
      this.updatePagination();
    }
  }

  /**
   * Moves to the previous page if the offset is greater than 0.
   */
  prevPage() {
    if (this.offset() > 0) {
      this.offset.update(value => value - this.limit());
      this.updatePagination();
    }
  }
}
