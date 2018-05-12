import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterViewComponent } from './printer-view.component';

describe('PrinterViewComponent', () => {
  let component: PrinterViewComponent;
  let fixture: ComponentFixture<PrinterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
