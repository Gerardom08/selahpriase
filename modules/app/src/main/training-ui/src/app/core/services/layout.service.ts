import { config } from '../core.config';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { debounceTime, fromEvent, map } from 'rxjs';

const store = {
  smartSkin: localStorage.getItem('sm-skin') || config.smartSkin,
  skin: config.skins.find((skin: any) => {
    return skin.name === (localStorage.getItem('sm-skin') || config.smartSkin);
  }),
  skins: config.skins,
  fixedHeader: localStorage.getItem('sm-fixed-header') === 'true',
  fixedNavigation: localStorage.getItem('sm-fixed-navigation') === 'true',
  fixedRibbon: localStorage.getItem('sm-fixed-ribbon') === 'true',
  fixedPageFooter: localStorage.getItem('sm-fixed-page-footer') === 'true',
  insideContainer: localStorage.getItem('sm-inside-container') === 'true',
  rtl: localStorage.getItem('sm-rtl') === 'true',
  colorblindFriendly: localStorage.getItem('sm-colorblind-friendly') === 'true',

  shortcutOpen: false,
  isMobile: (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())),
  device: '',

  mobileViewActivated: false,
  menuCollapsed: false,

  layout: 'vertical', // vertical, horizontal
  subLayout: '', // horizontal-2
  collapseMenu: false,
  layoutType: 'menu-light', // menu-dark, menu-light, dark
  headerBackColor: 'background-blue', // background-blue, background-red, background-purple, background-info, background-dark
  rtlLayout: false,
  navFixedLayout: false,
  headerFixedLayout: false,
  boxLayout: false
};

@Injectable()
export class LayoutService {

  public styleSelectorToggle?: boolean; // open configuration menu
  public layoutType!: string; // layout type
  public rtlLayout: any; // rtl type
  public menuFixedLayout: any; // menu/navbar fixed flag
  public headerFixedLayout: any; // header fixed flag
  public boxLayout: any; // box layout flag
  public headerBackgroundColor!: string; // header background color

  public isConfig?: boolean;

  store: any;

  scroll = (): void => {
    if (this.headerFixedLayout === false) {
      (document.querySelector('#nav-ps-next') as HTMLElement).style.maxHeight = 'calc(100vh)';
      const el = document.querySelector('.pcoded-navbar.menupos-fixed') as HTMLElement;
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 60) {
        el.style.position = 'fixed';
        el.style.transition = 'none';
        el.style.marginTop = '0';
      } else {
        el.style.position = 'absolute';
        el.style.marginTop = '60px';
      }
    } else if (document.querySelector('.pcoded-navbar')?.hasAttribute('style')) {
      document.querySelector('.pcoded-navbar.menupos-fixed')?.removeAttribute('style');
    }
  };

  constructor(private location: Location) {
    this.store = store;
    this.ngOnInit();

    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map(() => {
        this.trigger();
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.styleSelectorToggle = false;

    this.layoutType = this.store.layoutType;

    this.setLayout(this.layoutType);

    this.headerBackgroundColor = this.store.headerBackColor;
    this.setHeaderBackground(this.headerBackgroundColor);

    this.rtlLayout = this.store.rtlLayout;
    this.changeRtlLayout(this.rtlLayout);

    this.menuFixedLayout = this.store.navFixedLayout;
    if (this.store.layout === 'vertical') {
      this.changeMenuFixedLayout(this.menuFixedLayout);
    }

    this.headerFixedLayout = this.store.headerFixedLayout;
    this.changeHeaderFixedLayout(this.headerFixedLayout);

    this.boxLayout = this.store.boxLayout;
    this.changeBoxLayout(this.boxLayout);
  }

  // change main layout
  setLayout(layout: string) {
    this.isConfig = true;
    document.querySelector('.pcoded-navbar')?.classList.remove('menu-light');
    document.querySelector('.pcoded-navbar')?.classList.remove('menu-dark');
    document.querySelector('body')?.classList.remove('able-pro-dark');

    this.layoutType = layout;
    if (layout === 'menu-light') {
      document.querySelector('.pcoded-navbar')?.classList.add(layout);
      this.setHeaderBackground('background-blue');
    }
    if (layout === 'dark') {
      this.setHeaderBackground('background-blue');
      document.querySelector('body')?.classList.add('able-pro-dark');
    }
    if (layout === 'reset') {
      this.reset2();
    }
  }

  setHeaderBackground(background: string) {
    this.headerBackgroundColor = background;
    document.querySelector('body')?.classList.remove('background-blue');
    document.querySelector('body')?.classList.remove('background-red');
    document.querySelector('body')?.classList.remove('background-purple');
    document.querySelector('body')?.classList.remove('background-info');
    document.querySelector('body')?.classList.remove('background-green');
    document.querySelector('body')?.classList.remove('background-dark');
    document.querySelector('body')?.classList.remove('background-grd-blue');
    document.querySelector('body')?.classList.remove('background-grd-red');
    document.querySelector('body')?.classList.remove('background-grd-purple');
    document.querySelector('body')?.classList.remove('background-grd-info');
    document.querySelector('body')?.classList.remove('background-grd-green');
    document.querySelector('body')?.classList.remove('background-grd-dark');
    document.querySelector('body')?.classList.remove('background-img-1');
    document.querySelector('body')?.classList.remove('background-img-2');
    document.querySelector('body')?.classList.remove('background-img-3');
    document.querySelector('body')?.classList.remove('background-img-4');
    document.querySelector('body')?.classList.remove('background-img-5');
    document.querySelector('body')?.classList.remove('background-img-6');

    document.querySelector('body')?.classList.add(background);
  }

  reset2() {
    this.ngOnInit();
  }

  changeRtlLayout(flag: any) {
    if (flag) {
      document.querySelector('body')?.classList.add('able-pro-rtl');
    } else {
      document.querySelector('body')?.classList.remove('able-pro-rtl');
    }
  }

  changeMenuFixedLayout(flag: any) {
    setTimeout(() => {
      if (flag) {
        document.querySelector('.pcoded-navbar')?.classList.remove('menupos-static');
        document.querySelector('.pcoded-navbar')?.classList.add('menupos-fixed');
        if (this.store.layout === 'vertical') {
          (document.querySelector('#nav-ps-next') as HTMLElement).style.maxHeight = 'calc(100vh - 60px)'; // calc(100vh - 70px) amit
        }
        window.addEventListener('scroll', this.scroll, true);
        window.scrollTo(0, 0);
      } else {
        document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
        document.querySelector('.pcoded-navbar')?.classList.remove('menupos-fixed');
        if (this.store.layout === 'vertical') {
          (document.querySelector('#nav-ps-next') as HTMLElement).style.maxHeight = 'calc(100%)'; // calc(100% - 70px) amit
        }
        if (this.store.layout === 'vertical') {
          window.removeEventListener('scroll', this.scroll, true);
        }
      }
    }, 100);
  }

  changeHeaderFixedLayout(flag: any) {
    if (flag) {
      document.querySelector('.pcoded-header')?.classList.add('headerpos-fixed');
    } else {
      document.querySelector('.pcoded-header')?.classList.remove('headerpos-fixed');
      // static
      if (this.store.layout === 'vertical' && this.menuFixedLayout) {
        window.addEventListener('scroll', this.scroll, true);
        window.scrollTo(0, 0);
      } else {
        window.removeEventListener('scroll', this.scroll, true);
      }
    }
  }

  changeBoxLayout(flag: any) {
    if (flag) {
      document.querySelector('body')?.classList.add('container');
      document.querySelector('body')?.classList.add('box-layout');
    } else {
      document.querySelector('body')?.classList.remove('box-layout');
      document.querySelector('body')?.classList.remove('container');
    }
  }

  onCollapseMenu(value?: any): void {
    if (typeof value !== 'undefined') {
      this.store.collapseMenu = value;
    } else {
      this.store.collapseMenu = !this.store.collapseMenu;
    }

    this.store.mobileViewActivated = window.innerWidth < 992
    
    if (this.store.mobileViewActivated) {
      $(".pcoded-navbar").toggleClass('mob-open');
    } else {
      if (this.store.collapseMenu) {
        document.querySelector('.pcoded-navbar')?.classList.add('navbar-collapsed');
        document.querySelector('.pcoded-main-container')?.classList.add('ml-70');
      } else {
        document.querySelector('.pcoded-navbar')?.classList.remove('navbar-collapsed');
        document.querySelector('.pcoded-main-container')?.classList.remove('ml-70');
      }
    }
  }

  trigger(): void {
    document.querySelector('.pcoded-navbar')?.classList.remove('mob-open');
    document.querySelector('.pcoded-navbar')?.classList.remove('navbar-collapsed');
    document.querySelector('.pcoded-main-container')?.classList.remove('ml-70');
    this.store.collapseMenu = false;
  }
}
