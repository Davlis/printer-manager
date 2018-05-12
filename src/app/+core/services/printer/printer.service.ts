import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LocalStorage } from 'ngx-webstorage';
import { Printer } from '../../models';
import { print } from 'util';

declare var $;

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  @LocalStorage()
  printers: Printer[];

  constructor(private http: Http) {
    console.log('how many');

    if (!this.printers) {
      this.printers = [];
    }
  }

  public getPrintersRef() {
    return this.printers;
  }

  public add(data) {
    const printer = new Printer(data);
    this.printers = [...this.printers].concat(printer);
    return printer;
  }

  public update(id, data) {
    return;
  }

  public remove(id) {
    return;
  }

  public async import(path) {
    const data = await this.load(path);
    return  data;
  }

  public export(data: Array<Printer>, filename: string = 'Export.json') {
    $.fn.dataTable.fileSave(
      new Blob([JSON.stringify(data)]),
      filename
    );
  }

  private async load(url: string) {
    const data = await this.http.get(url)
      .toPromise()
      .then((response) => {
        return this.extractData(response);
      });
    return data;
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }
}
