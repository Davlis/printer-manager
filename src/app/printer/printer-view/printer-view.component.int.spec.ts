import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { PrinterService, Printer } from '../../+core';
import { PrinterViewComponent } from './printer-view.component';

describe('PrinterViewComponent', () => {
    let component: PrinterViewComponent;
    let fixture: ComponentFixture<PrinterViewComponent>;
    let printerService: PrinterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PrinterViewComponent],
            imports: [RouterTestingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, DropdownModule, InputTextareaModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrinterViewComponent);
        component = fixture.componentInstance;
        printerService = fixture.debugElement.injector.get(PrinterService);
        fixture.detectChanges();
    });

    beforeEach(() => {
        printerService.printers = [];
    });

    describe('Integration tests', () => {
        it('should add printer to global printers array in Printer service', () => {
            const printer = {
                name: 'Printerr',
                type: Printer.types.LASER,
                status: Printer.statuses.ONLINE,
                ipAddress: '192.168.0.13',
                color: 'Red',
                description: 'My description'
            };
            component.formGroup.setValue(printer);
            component.submit();
            const printerRef = printerService.getPrintersRef();
            const printerFromService = printerRef[0];
            const expression = Printer.eql(printerFromService, printer);
            expect(expression).toBeTruthy();
        });
    });
});
