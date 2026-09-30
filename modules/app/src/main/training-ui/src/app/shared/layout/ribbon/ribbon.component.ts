import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  standalone:false
})
export class RibbonComponent implements OnInit, OnDestroy {

  items: Array<string> = [];
  routes: any = {};
  pageTitle = '';

  private sub!: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.extract(this.router.routerState.root);

    this.sub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(v => {
      this.items = [];
      this.routes = {};
      this.extract(this.router.routerState.root);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  extract(route: any): void {
    const pageTitle = route.data.value['pageTitle'];

    if (pageTitle && this.items.indexOf(pageTitle) === -1) {
      this.items.push(route.data.value['pageTitle']);
      this.routes[pageTitle]=route;
    }

    this.pageTitle = pageTitle;
    if (route.children) {
      route.children.forEach((it: any) => {
        this.extract(it);
      });
    }
  }
}
