import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

declare var $: any;

@Directive({
    selector: '[appMenu]',
    standalone: false
})
export class MenuDirective implements OnInit, AfterViewInit {

  private $menu: any;

  constructor(
    private menu: ElementRef,
  ) {
    this.$menu = $(this.menu.nativeElement);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.$menu.find('li:has(> ul)').each((i: number, li: any) => {
      const $menuItem = $(li);
      const $a = $menuItem.find('>a');

      $a.on('click', (e: Event) => {
        this.toggle($menuItem);
        e.stopPropagation();
        return false;
      });
    });

    setTimeout(() => {
      this.processLayout();
    }, 200);
  }

  private processLayout = (layoutStore?: any) => {
    this.$menu.find('li.active').each((i: number, li: any) => {
      $(li).parents('li').each((j: number, parentLi: any) => {
        this.toggle($(parentLi), true);
      });
    });
  }

  private toggle($el: any, condition = !$el.data('open')): void {
    $el.toggleClass('pcoded-trigger', condition);

    if (condition) {
      $el.find('>ul').slideDown();
    } else {
      $el.find('>ul').slideUp();
    }

    $el.data('open', condition);

    if (condition) {
      $el.siblings('.pcoded-trigger').each((i: number, it: any) => {
        const sib = $(it);
        this.toggle(sib, false);
      });
    }
  }
}
