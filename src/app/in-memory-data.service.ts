import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Auction } from './auction';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const auctions = [
      { id: 11, title: 'Mr. Nice' },
      { id: 12, title: 'Narco' },
      { id: 13, title: 'Bombasto' },
      { id: 14, title: 'Celeritas' },
      { id: 15, title: 'Magneta' },
      { id: 16, title: 'RubberMan' },
      { id: 17, title: 'Dynama' },
      { id: 18, title: 'Dr IQ' },
      { id: 19, title: 'Magma' },
      { id: 20, title: 'Tornado' }
    ];
    return {auctions};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(auctions: Auction[]): number {
    return auctions.length > 0 ? Math.max(...auctions.map(auction => auction.id)) + 1 : 11;
  }
}