import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PrinterService } from '../../+core/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-printer-view',
  templateUrl: './printer-view.component.html',
  styleUrls: ['./printer-view.component.css']
})
export class PrinterViewComponent implements OnInit {

  editMode = false;
  id: string;

  formGroup: FormGroup;

  STATUSES: Array<any> = [
    { label: 'Select status', value: null },
    { label: 'Online', value: 'Online' },
    { label: 'Offline', value: 'Offline' }
  ];

  constructor(private fb: FormBuilder,
    private printerService: PrinterService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.formInit();
    if (this.route.snapshot.params.id !== 'new') {
      this.editMode = true;
      this.id = this.route.snapshot.params.id;
      const printer = this.printerService.retrievePrinter(this.id);
      this.populateForm(printer);
    }
  }

  private formInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      status: [null, Validators.required],
      ipAddress: ['', Validators.required],
      color: ['', Validators.required],
      description: '',
    });
  }

  private populateForm(data): void {
    this.formGroup.get('name').setValue(data.name);
    this.formGroup.get('status').setValue(data.status);
    this.formGroup.get('ipAddress').setValue(data.ipAddress);
    this.formGroup.get('color').setValue(data.color);
    this.formGroup.get('description').setValue(data.description);
  }

  private submit() {
    if (this.formGroup.valid) {
      if (this.editMode) {
        this.printerService.update(this.id, this.formGroup.value);
      } else {
        this.printerService.add(this.formGroup.value);
      }
      this.back();
    }
  }

  private back(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
