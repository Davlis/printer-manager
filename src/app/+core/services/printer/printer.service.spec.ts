import { TestBed, inject } from '@angular/core/testing';

import { PrinterService } from './printer.service';
import { STATUS, Printer } from '../../models';

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
      service.printers = [];
      const printer = {
        name: 'Printerr',
        status: STATUS.Online,
        ipAddress: '192.168.0.13',
        color: 'Red',
        description: 'My description'
      };
      service.add(printer);
      const printerRef = service.getPrintersRef();
      const printerFromService = printerRef[0];
      const expression = Printer.eql(printerFromService, printer);
      expect(expression).toBeTruthy();
    }));
  });
});
