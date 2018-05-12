import { Routes } from '@angular/router';

import { PrinterListComponent } from './printer-list/printer-list.component';
import { PrinterViewComponent } from './printer-view/printer-view.component';

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
        path: '**',
        redirectTo: ''
    }
];
