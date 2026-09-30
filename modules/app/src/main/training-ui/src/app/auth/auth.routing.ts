import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authorized',
    pathMatch: 'full',
  },
  {
    path: 'on-login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'authorized',
    loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule)
  },
  {
    path: 'on-logout',
    loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule)
  },
];

export const routing = RouterModule.forChild(routes);
