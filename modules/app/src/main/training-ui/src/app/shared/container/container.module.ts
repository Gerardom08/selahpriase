import { I18nModule } from './../i18n/i18n.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';


@NgModule({
  declarations: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    I18nModule
  ],
  exports: [
    ContainerComponent
  ]
})
export class ContainerModule { }
