import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { touchAll, populateForm } from '../../+core/helpers/forms.helper';
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
      populateForm(this.formGroup, printer, ['id']);
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

  submit() {
    touchAll(this.formGroup);

    if (this.formGroup.valid) {
      if (this.editMode) {
        this.printerService.update(this.id, this.formGroup.value);
      } else {
        this.printerService.add(this.formGroup.value);
      }
      this.back();
    }
  }

  back(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
