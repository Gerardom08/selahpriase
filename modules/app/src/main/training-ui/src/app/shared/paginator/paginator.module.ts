import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorComponent } from './paginator.component';
import { I18nModule } from '../i18n/i18n.module';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    I18nModule
  ],
  exports: [PaginatorComponent]
})
export class PaginatorModule {}