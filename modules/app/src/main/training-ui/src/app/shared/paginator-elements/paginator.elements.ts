import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator-elements',
  templateUrl: './paginator.elements.html',
  standalone: false
})
export class PaginatorElements implements OnInit, OnChanges {

  @Input() paginator: any;
  @Output() page = new EventEmitter<number>();

  pages: number[] = [];
  from: number = 0;
  to: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const paginatorUpdated = changes['paginator'];
    if (paginatorUpdated.previousValue) { // si hay una version anterior o un estado anterior
      this.initPaginator();
    }
  }

  goPage(page: number): void {
    this.page.emit(page);
  }

  private initPaginator(): void {

    // implementando rangos de paginas
    this.from = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);
    this.to = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);

    if (this.paginator.totalPages > 5) {
      this.pages = new Array(this.to - this.from + 1).fill(0).map((_valor, indice) => indice + this.from);
    } else {
      this.pages = new Array(this.paginator.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }

  }
}
