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
  }

  private back(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
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

  private submit() {
    if (this.formGroup.valid) {
      this.printerService.add(this.formGroup.value);
      this.back();
    }
  }
}
