mport { TestBed } from '@angular/core/testing';
iport { AuctionServiceService } from './auction-service.service';

describe('AuctionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuctionServiceService = TestBed.get(AuctionServiceService);
    expect(service).toBeTruthy();
  });
});
