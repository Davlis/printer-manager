import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AppComponent } from './app.component';
import { PrinterListComponent } from './printer-list/printer-list.component';
import { PrinterViewComponent } from './printer-view/printer-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PrinterListComponent,
    PrinterViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTablesModule,
    Ng2Webstorage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
