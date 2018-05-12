import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterStatComponent } from './printer-stat.component';

describe('PrinterStatComponent', () => {
  let component: PrinterStatComponent;
  let fixture: ComponentFixture<PrinterStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
