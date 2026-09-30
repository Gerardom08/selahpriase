import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-spinner',
  standalone:true,
  template: `
  <div class="modal spinerModal" [id]="idModal" role="dialog">
    <div class="modal-dialog modal-dialog2" role="document">
      <div class="modal-content modal-dialog2">
        <div class="modal-body" id="contLoad">
          <div class="lds-ripple"><div></div><div></div></div>
          <small>Cargando...</small>
        </div>
      </div>
    </div>
  </div>
`,
})
export class SpinnerComponent implements OnInit {

  public idModal?: string;

  constructor() { }

  ngOnInit(): void {
    this.randomId();
  }

  show(): void {
    $(`#${this.idModal}`).attr('data-backdrop', 'false').attr('data-keyboard', 'false');
    $('#contLoad').addClass('centrando').addClass('documentSpace');
    $(`#${this.idModal}`).modal('show');
  }

  hide(): void {
    $(`#${this.idModal}`).modal('hide');
  }

  private randomId(): void {
    let id: number;
    id = Math.trunc(Math.random() * 100);
    this.idModal = 'spinerModal' + id;
  }
}
