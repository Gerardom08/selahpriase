import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { services } from './core/services';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        SharedModule,
    ],
    providers: [
      ...services
    ],
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'ui';
}
