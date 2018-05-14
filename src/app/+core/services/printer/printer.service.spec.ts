import { TestBed, inject } from '@angular/core/testing';

import { PrinterService } from './printer.service';

describe('PrinterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrinterService]
    });
  });

  it('should be created', inject([PrinterService], (service: PrinterService) => {
    expect(service).toBeTruthy();
  }));

  describe('Unit tests', () => {
    it('should add new printer to printers array', inject([PrinterService], (service: PrinterService) => {
      const currentLength = service.getPrintersRef().length;
      service.add({
        name: 'Prrinter',
        status: 'Offline',
        ipAddress: '192.168.0.13',
        description: 'My new printer',
        color: 'Red'
      });
      const afterAddLength = service.getPrintersRef().length;
      expect(afterAddLength).toEqual(currentLength + 1);
    }));
  });
});
