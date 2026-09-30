import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { I18nModule } from '../../i18n/i18n.module';
import { UtilsModule } from '../../utils/utils.module';
import { LayoutService } from '../../../core/services';


@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        I18nModule,
        UtilsModule,
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [
        LayoutService,
    ]
})
export class HeaderModule { }
