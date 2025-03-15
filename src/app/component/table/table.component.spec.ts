import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let componentRef: ComponentRef<TableComponent>
  let fixture: ComponentFixture<TableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TableComponent)

    component = fixture.componentInstance
    componentRef = fixture.componentRef
    componentRef.setInput('countries', [])
    componentRef.setInput('expandedCountry', null)
    componentRef.setInput('totalPages', 1)
    componentRef.setInput('currentPage', 1)
    
    fixture.detectChanges()
  })

  describe('getCurrency', () => {
    it('should return a string of all currencies', () => {
      const countryMock = {
        currencies: {
          USD: { name: 'US Dollar' },
          EUR: { name: 'Euro' }
        }
      };
      expect(component.getCurrency(countryMock as any)).toBe('US Dollar, Euro');
    });

    it('should return "N/A" if no currencies are found', () => {
      const countryMock = {
        currencies: null
      };
      expect(component.getCurrency(countryMock as any)).toBe('N/A');
    });
  });

  describe('getDemonym', () => {
    it('should return a demonym string for the country', () => {
      const countryMock = {
        demonyms: {
          eng: { m: 'Englishman', f: 'Englishwoman' }
        }
      };
      expect(component.getDemonym(countryMock as any)).toBe('Englishwoman');
    });

    it('should return the male demonym if female demonym is not found', () => {
      const countryMock = {
        demonyms: {
          eng: { m: 'Frenchman', f: '' }
        }
      };

      expect(component.getDemonym(countryMock as any)).toBe('Frenchman');
    });

    it('should return "N/A" if no demonyms are found', () => {
      const countryMock = {
        demonyms: null
      };

      expect(component.getDemonym(countryMock as any)).toBe('N/A');
    });
  });
  

});
