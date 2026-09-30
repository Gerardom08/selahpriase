import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeAbstractControlValue } from './pipe-abstract-control-value.pipe';
import { FindInPipe } from './find-in.pipe';

@NgModule({
  imports: [
    CommonModule,
    PipeAbstractControlValue,
    FindInPipe
  ],
  exports: [
    PipeAbstractControlValue,
    FindInPipe
  ]
})
export class PipesModule { }
