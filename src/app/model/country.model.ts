/**
 * Interface representing the structure of a Country object
 */
export default interface Country {
    name: { common: string };
    capital: string[] | null;
    currencies: { [key: string]: { name: string } };
    demonyms: { [key: string]: { f: string; m: string } };
    flags: { png: string };
    population: number;
    region: string;
    timezones: string[];
  }
  