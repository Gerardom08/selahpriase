import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private config = {
    timeOut: 4500,
    extendedTimeOut: 100,
    progressBar: false,
    positionClass: 'toast-top-right',
    tapToDismiss: true
  }


  constructor(
    private toaster:ToastrService,
  ) {}

  public showSuccess(i18nPipe:any,body:string,title?:string){
    this.toaster.success(body,title ?? i18nPipe.transform("Success"),this.config);
  }

  public showError(i18nPipe:any,body:string,title?:string){
    this.toaster.error(body,title ?? i18nPipe.transform("Error"),this.config);
  }

  public showInfo(i18nPipe:any,body:string,title?:string){
    this.toaster.info(body,title ?? i18nPipe.transform("Info"),this.config);
  }

  public showWarning(i18nPipe:any,body:string,title?:string){
    this.toaster.warning(body,title ?? i18nPipe.transform("Warning"),this.config);
  }

}
