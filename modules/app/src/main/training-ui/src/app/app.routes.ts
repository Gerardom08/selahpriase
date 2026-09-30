import { Routes } from '@angular/router';

import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component';
import { mainGuard } from './auth/func-guards/main.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },

      {
        path: 'home',
        loadChildren: () =>
          import('./features/components/components.module').then(
            m => m.ComponentsModule
          ),
        data: { pageTitle: 'Home' },
      },

      {
        path: 'listado',
        loadChildren: () =>
          import('./features/listado/listado.module').then(
            m => m.ListadoModule
          ),
        data: { pageTitle: 'home' },
      }
    ]
  },
];