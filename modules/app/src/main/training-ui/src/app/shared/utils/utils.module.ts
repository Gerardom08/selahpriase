import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { CommonModule } from '@angular/common';
import { ToasterService } from './toaster.service';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SpinnerComponent,
  ],
  exports: [
    SpinnerComponent,
  ],
  providers: [
    ToasterService,
  ]
})
export class UtilsModule {
  static forRoot() {
    return {
      ngModule: UtilsModule,
      providers: [ToasterService]
    };
  }
}
