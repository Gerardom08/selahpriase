import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './app-layouts/main-layout.component';
import { RouterModule } from '@angular/router';
import { RibbonComponent } from './ribbon';
import { RouteBreadcrumbsComponent } from './ribbon/route-breadcrumbs.component';
import { HeaderModule } from './header/header.module';
import { NavigationModule } from './navigation/navigation.module';
import { AuthLayoutComponent } from './app-layouts/auth-layout.component';
import { StylerModule } from './styler/styler.module';
import { I18nModule } from '../i18n/i18n.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    MainLayoutComponent,
    AuthLayoutComponent,
    RibbonComponent,
    RouteBreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    NavigationModule,
    StylerModule,
    RouterModule,
    I18nModule,
    NgxSpinnerModule
  ]
})
export class LayoutModule { }
