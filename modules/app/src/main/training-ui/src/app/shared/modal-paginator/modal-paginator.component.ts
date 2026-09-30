import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { I18nModule } from '../i18n/i18n.module';
import { I18nPipe } from '../i18n/i18n.pipe';
import { I18nService } from '../i18n/i18n.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterService } from '../utils/toaster.service';
import { CommonModule } from '@angular/common';
import { ProfilingService } from '../../components/services/profiling.service';
import { UtilsModule } from '../utils/utils.module';
import { AuthService } from '../../auth/services/auth.service';
import { PaginatorModule } from '../paginator/paginator.module';
import { PaginatorElementsModule } from '../paginator-elements/paginator.elements.module';

@Component({
  selector: 'app-modal-paginator',
  standalone: true,
  imports: [
    PaginatorElementsModule,
    I18nModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    UtilsModule,
    PaginatorModule
  ],
  providers: [
    ProfilingService,
    AuthService
  ],
  templateUrl: './modal-paginator.component.html',
  styleUrl: './modal-paginator.component.css'
})
export class ModalPaginatorComponent implements OnChanges{
  @Output() okPaginator = new EventEmitter();
  @Output() onCloseModal = new EventEmitter();
  @Input() option: number = 0;

  showDomainModal: boolean = false;
  public paginator: any;
  private i18nPipe?: any;
  public forms!: FormGroup;
  public data: any[] = [];
  paginatorSelected: any = {};
  public idDomain: number = 1;
  private lastIndex:number=-1;


  constructor(
    private i18nService: I18nService,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private profilingService: ProfilingService,
    private authService:AuthService
  ) {
    this.initForm();
    this.i18nPipe = new I18nPipe(this.i18nService);
  }

  ngOnChanges(changes:any): void {
    setTimeout(() => {
      if (this.option == 1) {
        this.searchWithParamsProfile(0);
      }
    }, 450);
  }

  public initForm() {
    this.forms = this.fb.group({
      search: ['', []],
    });
  }

  public searchWithParamsProfile(page: number) {
    if (this.checkInvalidForm()) return;
    let value = this.forms.value;
    this.profilingService.getProfileByIdDomainAndParams(this.idDomain, value.search, page, 10).subscribe(
      response => {
        this.data = response.content;
        this.paginator = response;
        this.toaster.showSuccess(this.i18nPipe, this.i18nPipe.transform('Search.notification.success'));
      },
      _ => {
        this.toaster.showError(this.i18nPipe, this.i18nPipe.transform('Search.notification.error'));
      }
    );
  }

  public checkInvalidForm() {
    if (this.forms.invalid) {
      Object.values(this.forms.controls)
        .forEach(control => control.markAsTouched());
      return true;
    }
    return false;
  }

  goPage(page: number): void {
    if (this.option == 1) {
      this.searchWithParamsProfile(page);
    }
  }

  public openModalPaginator() {
    $('#selectPaginatorModal').modal('show');
    /* this.firstElements=true; */
  }


  public onOkPaginator() {
    this.okPaginator.emit(this.paginatorSelected);
    this.closeModal();
  }

  public closeModal() {
    this.paginatorSelected = {};
    this.lastIndex=-1;
    $('#selectPaginatorModal').modal('hide');
    this.disableAllChecks();
    this.onCloseModal.emit();
  }

  public onSearch() {
    if (this.option == 1) {
      this.searchWithParamsProfile(0);
    }
  }

  public objectSelected(dto: any,index:number) {
    if(this.lastIndex!=-1){
      let btn:any= document.getElementById("check-"+this.lastIndex);
      btn.checked=false;
    }
    this.lastIndex=index;
    this.paginatorSelected = dto;
  }

  public disableAllChecks(){
    let checks = document.querySelectorAll(".check");
    checks.forEach((item:any)=>{
      item.checked=false;
    });
  }

}
