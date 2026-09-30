import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ContainerModule } from './container/container.module';
import { CardModule } from './card/card.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { I18nModule } from './i18n/i18n.module';


@NgModule({ 
    declarations: [],
    exports: [
        LayoutModule,
        NgScrollbarModule,
        ContainerModule,
        CardModule,
        I18nModule,
    ], 
    imports: [LayoutModule], 
    providers: [provideHttpClient(withInterceptorsFromDi())] 
})
export class SharedModule { }
