import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/services/layout.service';
@Component({
    selector: 'app-styler',
    templateUrl: './styler.component.html',
    standalone: false
})
export class StylerComponent implements OnInit {

  layoutType!: string; // layout type
  rtlLayout: any; // rtl type
  menuFixedLayout: any; // menu/navbar fixed flag
  headerFixedLayout: any; // header fixed flag
  boxLayout: any; // box layout flag
  headerBackgroundColor!: string; // header background color

  nextConfig: any;

  constructor(
    private layoutService: LayoutService
  ) {
    this.nextConfig = this.layoutService.store;
  }

  ngOnInit(): void {
    this.layoutType = this.layoutService.layoutType;
    this.rtlLayout = this.layoutService.rtlLayout;
    this.menuFixedLayout = this.layoutService.menuFixedLayout;
    this.headerFixedLayout = this.layoutService.headerFixedLayout;
    this.boxLayout = this.layoutService.boxLayout;
    this.headerBackgroundColor = this.layoutService.headerBackgroundColor;
  }

  setLayout(layout: string): void {
    this.layoutType = layout;
    this.layoutService.setLayout(layout);
  }

  setHeaderBackground(background: string): void {
    this.headerBackgroundColor = background;
    this.layoutService.setHeaderBackground(background);
  }

  setRtlLayout(e: any): void {
    const flag = !!e.target.checked;
    this.layoutService.changeRtlLayout(flag);
  }

  setMenuFixedLayout(e: any): void {
    const flag = !!e.target.checked;
    this.layoutService.changeMenuFixedLayout(flag);
  }

  setHeaderFixedLayout(e: any): void {
    const flag = !!e.target.checked;
    this.layoutService.changeHeaderFixedLayout(flag);
  }

  setBoxLayout(e: any): void {
    const flag = !!e.target.checked;
    this.layoutService.changeBoxLayout(flag);
  }

  openMenuStyler(): void {
    $('#styleSelector').toggleClass('open');
    $('#styleSelector').removeClass('prebuild-open');
  }
}
