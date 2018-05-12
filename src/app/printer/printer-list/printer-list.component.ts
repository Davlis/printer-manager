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
          action: (e, dt, node, config) => this.gotoPrinterUpdate()
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
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
          $('td', row).unbind('click');
          $('td', row).bind('click', () => {
            setTimeout(() => {
              if ($(row).hasClass('selected')) {
                this.selected = this.printers[index];
              } else {
                this.selected = null;
              }
            });
          });
        return row;
      },
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

  private deletePrinter() {
    if (this.selected) {
      this.printerService.remove(this.selected.id);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.row('.selected').remove();
        dtInstance.draw();
        this.selected = null;
      });
    }
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
