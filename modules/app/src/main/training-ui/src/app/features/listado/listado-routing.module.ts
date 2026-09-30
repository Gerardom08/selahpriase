import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado.component';

const routes: Routes = [
  {
    path: '',
    component: ListadoComponent,
    data: {
      pageTitle: 'Listado'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadoRoutingModule {}