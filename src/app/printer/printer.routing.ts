import { Routes } from '@angular/router';

import { PrinterListComponent } from './printer-list/printer-list.component';
import { PrinterViewComponent } from './printer-view/printer-view.component';
import { PrinterStatComponent } from './printer-stat/printer-stat.component';

export const printerRoutes: Routes = [
    {
        path: '',
        component: PrinterListComponent
    },
    {
        path: ':id',
        component: PrinterViewComponent
    },
    {
        path: ':id/stats',
        component: PrinterStatComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
];
