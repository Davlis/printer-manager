import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PrinterService } from '../../+core';

import { PrinterViewComponent } from './printer-view.component';

describe('PrinterViewComponent', () => {
  let component: PrinterViewComponent;
  let fixture: ComponentFixture<PrinterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrinterViewComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, DropdownModule, InputTextareaModule],
      providers: [PrinterService]
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
