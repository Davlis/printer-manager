import { Routes } from '@angular/router';
import { PrinterListComponent, PrinterViewComponent, PrinterStatComponent } from './index';

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
