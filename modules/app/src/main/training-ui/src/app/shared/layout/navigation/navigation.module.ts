import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MenuDirective } from './menu.directive';
import { I18nModule } from '../../i18n/i18n.module';



@NgModule({
  declarations: [
    NavigationComponent,
    MenuDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgScrollbarModule,
    I18nModule
  ],
  exports: [
    NavigationComponent,
    MenuDirective,
  ]
})
export class NavigationModule { }
