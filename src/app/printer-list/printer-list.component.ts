import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

import { Printer } from '../../models/Printer';
import { PrinterService } from '../+core/services/printer/printer.service';

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

  constructor(private printerService: PrinterService) { }

  ngOnInit(): void {
    this.initializeDatatable();
  }

  ngAfterViewInit(): void {
    this.printers = this.printerService.getPrintersRef();
    this.addDataToRowsAndRedraw(this.printers);
  }

  private initializeDatatable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columns: [

        {
          data: 'name',
          title: 'Name'
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
          title: 'Description'
        },
        {
          data: 'color',
          title: 'Color'
        }
      ],
      dom: 'Bfrtip',
      buttons: [
        {
          text: 'Add printer',
          key: '1',
          action: (e, dt, node, config) => this.gotoPrinterCreate()
        },
        {
          text: 'Import printers',
          key: '2',
          action: (e, dt, node, config) => this.import()
        },
        {
          text: 'Export printers',
          action: (e, dt, button, config) => this.printerService.export(this.printers)
        },
        'copy',
        'print'
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.gotoPrinterView(this.printers[index].id);
        });
        return row;
      }
    };
  }

  private gotoPrinterCreate() {
    return;
  }

  private gotoPrinterView(id: number) {
    return;
  }

  private async import() {
    const path = prompt('Please enter path');
    if (path) {
      this.printers = await this.printerService.import(path);
      this.addDataToRowsAndRedraw(this.printers);
    }
  }

  private addDataToRowsAndRedraw(data): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().rows.add(data).draw();
    });
  }
}
