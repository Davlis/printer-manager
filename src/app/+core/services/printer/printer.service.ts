import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';

import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { Printer } from '../../models';
import { print } from 'util';

declare var $;

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  @LocalStorage()
  printers: Printer[];

  printersSubject: BehaviorSubject<Printer[]> = new BehaviorSubject([]);
  printers$ = this.printersSubject.asObservable();

  constructor() {
    if (!this.printers) {
      this.printers = [];
    }
    this.propagateChanges();
  }

  public getPrintersRef() {
    return this.printers;
  }

  public retrievePrinter(id: string) {
    const printer = this.printers.filter(p => p.id === id)[0];
    if (!printer) {
      throw new Error('Error with fetching printer');
    }
    return printer;
  }

  public add(data) {
    const printer = new Printer(data);
    this.printers = [...this.printers].concat(printer);
    this.propagateChanges();
    return printer;
  }

  public update(id, data) {
    const printer = new Printer(data);
    printer.id = id;
    this.printers = this.printers.filter(p => p.id !== id);
    this.printers = [...this.printers].concat(printer);
    this.propagateChanges();
    return printer;
  }

  public remove(id) {
    this.printers = this.printers.filter(p => p.id !== id);
    this.propagateChanges();
    return;
  }

  public propagateChanges() {
    this.printersSubject.next(this.printers);
  }

  public async import(data) {
    this.printers = [].concat(data);
    this.propagateChanges();
    return this.printers;
  }

  public export(data: Array<Printer>, filename: string = 'Export.json') {
    $.fn.dataTable.fileSave(
      new Blob([JSON.stringify(data)]),
      filename
    );
  }
}
