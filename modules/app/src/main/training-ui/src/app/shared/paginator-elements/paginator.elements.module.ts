import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorElements } from './paginator.elements';
//import { I18nModule } from "../i18n/i18n.module";

@NgModule({
    declarations: [PaginatorElements],
    exports: [PaginatorElements],
    imports: [
        CommonModule,
        //I18nModule
    ]
})
export class PaginatorElementsModule { }
