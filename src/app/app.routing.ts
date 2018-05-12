import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'printer',
        loadChildren: './printer/printer.module#PrinterModule'
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'printer'
    }
];
