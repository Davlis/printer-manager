import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute } from '@angular/router';

import { Printer, PrinterService } from '../../+core';
import { readJSON, extractFileFromDOMEvent } from '../../+core/helpers';
import { Subscribable } from 'rxjs';

declare var $;

@Component({
  selector: 'app-printer-list',
  templateUrl: 'printer-list.component.html'
})
export class PrinterListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  printerSub = null;

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
    this.printerSub = this.printerService.printerObservable.subscribe((v) => {
      this.printers = v;
      this.addDataToRowsAndRedraw(this.printers);
    });
    this.registerOnSelect();
    this.registerOnDeselect();
  }

  private initializeDatatable(): void {
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
          data: 'type',
          title: 'Type'
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
          text: '<i class="fa fa-upload"></i> Import',
          action: () => {
            const fileSelector = $('<input type="file" name="import"/>');
            $(fileSelector).on('change', this.import.bind(this));
            fileSelector.click();
          }
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

  private gotoPrinterCreate(): void {
    this.router.navigate(['./', 'new'], { relativeTo: this.route });
  }

  private gotoPrinterUpdate(): void {
    if (this.selected) {
      this.router.navigate(['./', `${this.selected.id}`], { relativeTo: this.route });
    }
  }

  private gotoPrinterStats(): void {
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

  private async import($event) {
    const file = extractFileFromDOMEvent($event);
    const data = await readJSON(file);
    this.printers = await this.printerService.import(data);
    this.addDataToRowsAndRedraw(this.printers);
  }

  private async addDataToRowsAndRedraw(data) {
    const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
    dtInstance.clear().rows.add(data).draw();
  }

  private async registerOnSelect() {
    const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
    dtInstance.on('select', (...args) => {
      console.log(args[3]);
      this.selected = this.printers[args[3]];
    });
  }

  private async registerOnDeselect() {
    const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
    dtInstance.on('deselect', () => this.selected = null);
  }

  ngOnDestroy() {
    if (this.printerSub) {
      this.printerSub.unsubscribe();
    }
  }
}
