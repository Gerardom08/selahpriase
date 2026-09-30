import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ListadoComponent } from "./listado.component";
import { ListadoRoutingModule } from "./listado-routing.module";

// IMPORTA EL MÓDULO DEL PAGINADOR
import { PaginatorModule } from "../../shared/paginator/paginator.module";
import { AddCancionComponent } from "./add-cancion/add-cancion.component";
import { AddCancionModalComponent } from "./add-cancion-modal/add-cancion-modal.component";

@NgModule({
  declarations: [
    ListadoComponent,
    AddCancionComponent,
    AddCancionModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ListadoRoutingModule,
    PaginatorModule
  ]
})
export class ListadoModule {}