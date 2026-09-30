import { NgModule } from '@angular/core';
import { StylerComponent } from './styler.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StylerComponent
  ],
  imports: [
    NgScrollbarModule,
    FormsModule,
  ],
  exports: [
    StylerComponent
  ]
})
export class StylerModule { }
