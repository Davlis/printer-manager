import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute } from '@angular/router';

import { Printer } from '../../+core/models';
import { PrinterService } from '../../+core/services';

declare var $;

@Component({
  selector: 'app-printer-list',
  templateUrl: 'printer-list.component.html'
})
export class PrinterListComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  printers: Printer[];

  dtOptions: any = {};

  selected: Printer;

  constructor(private printerService: PrinterService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeDatatable();
  }

  ngAfterViewInit(): void {
    this.printers = this.printerService.getPrintersRef();
    this.addDataToRowsAndRedraw(this.printers);
    this.registerOnSelect();
    this.registerOnDeselect();
  }

  private initializeDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columns: [
        {
          data: 'id',
          visible: false,
          orderable: false
        },
        {
          data: 'name',
          title: 'Name',
          width: '20%',
        },
        {
          data: 'status',
          title: 'Status'
        },
        {
          data: 'ipAddress',
          title: 'Network address'
        },
        {
          data: 'description',
          title: 'Description',
        },
        {
          data: 'color',
          title: 'Color'
        }
      ],
      dom: 'Bfrtip',
      buttons: [
        {
          text: 'Add',
          key: '1',
          action: (e, dt, node, config) => this.gotoPrinterCreate()
        },
        {
          text: 'Edit',
          key: '2',
          action: (e, dt, node, config) => this.gotoPrinterUpdate()
        },
        {
          text: 'Delete',
          key: '3',
          action: (e, dt, node, config) => this.deletePrinter()
        },
        {
          text: 'Stats',
          key: '4',
          action: (e, dt, node, config) => this.gotoPrinterStats()
        },
        {
          text: 'Import',
          key: '5',
          action: (e, dt, node, config) => this.import()
        },
        {
          text: 'Export',
          key: '6',
          action: (e, dt, button, config) => this.printerService.export(this.printers)
        },
        'copy',
        'print'
      ],
      select: true
    };
  }

  private gotoPrinterCreate() {
    this.router.navigate(['./', 'new'], { relativeTo: this.route });
  }

  private gotoPrinterUpdate() {
    if (this.selected) {
      this.router.navigate(['./', `${this.selected.id}`], { relativeTo: this.route });
    }
  }

  private gotoPrinterStats() {
    if (this.selected) {
      this.router.navigate(['./', `${this.selected.id}`, 'stats'], { relativeTo: this.route });
    }
  }

  private async deletePrinter() {
    if (this.selected) {
      this.printerService.remove(this.selected.id);

      const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
      dtInstance.row('.selected').remove();
      dtInstance.draw();
      this.selected = null;
    }
  }

  private async import() {
    const path = prompt('Please enter path');
    if (path) {
      this.printers = await this.printerService.import(path);
      this.addDataToRowsAndRedraw(this.printers);
    }
  }

  private async addDataToRowsAndRedraw(data) {
    const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
    dtInstance.clear().rows.add(data).draw();
  }

  private async registerOnSelect() {
    const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
    dtInstance.on('select', (...args) => {
      this.selected = this.printers[args[3]];
    });
  }

  private async registerOnDeselect() {
    const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
    dtInstance.on('deselect', () => this.selected = null);
  }
}