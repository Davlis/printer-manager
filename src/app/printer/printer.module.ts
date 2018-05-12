import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { Ng2Webstorage } from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import { printerRoutes } from './printer.routing';

import { PrinterListComponent } from './printer-list/printer-list.component';
import { PrinterViewComponent } from './printer-view/printer-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DataTablesModule,
        Ng2Webstorage,
        RouterModule.forChild(printerRoutes),
    ],
    declarations: [
        PrinterListComponent,
        PrinterViewComponent
    ]
})
export class PrinterModule { }
