import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view/tree-view.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TreeViewComponent
  ],
  exports: [
    TreeViewComponent
  ]
})
export class UiModule { }
