import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-breadcrumbs',
  template: `
    <ul class="breadcrumb">
        <li class="breadcrumb-item">
          <i class="feather icon-home"></i>
        </li>
        @for (item of items; track $index) {
          <li class="breadcrumb-item" (click)="changeRoute(item)">{{ item | i18n }}</li>
        }
    </ul>
  `,
  styles: [
    `
    .breadcrumb-item {
        color: #fff;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
    }

    .breadcrumb-item:before {
      color: rgba(255, 255, 255, 0.5);
    }

    .breadcrumb {
      background: transparent;
      padding: 0;
      margin-bottom: 0;
    }
  `
  ],
  standalone: false
})
export class RouteBreadcrumbsComponent {
  @Input() items: Array<string> = [];
  @Input() routes: any = {};
  
  constructor(private router: Router) { }

  changeRoute(item:string){
    if(!this.routes[item]){
      console.error("it cannot change the route",item, this.routes[item]);
      return;
    }
    let arr = this.routes[item].urlSubject._value; 
    if(arr[0]){
      let newPath = this.routes[item].snapshot._routerState.url.split(arr[0].path)[0]+arr[0].path;
      this.router.navigate([newPath]);
    }
  }
}
