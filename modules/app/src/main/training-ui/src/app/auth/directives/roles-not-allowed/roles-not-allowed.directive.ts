import { Directive, EventEmitter, Input, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { authorizations } from '../../config/authorizations';

@Directive({
  selector: '[rolesNotAllowed]',
  standalone: false,
})
export class RolesNotAllowedDirective implements OnInit {
  @Input('rolesNotAllowed') dirAuthorization: string = '';
  @Output('allowFlag') flag = new EventEmitter<boolean>();
  rolesAllowed: string[] = [];
  hasView: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.dirAuthorization.includes(',')){
      this.configurationMultipleRole();
    }else{
      this.configurationSimpleRole();
    }
  }

  public configurationMultipleRole(){
    let rolesInput:string[] = this.dirAuthorization.split(',');
    for(let a=0;a<rolesInput.length;a++){
      let roles = [];
      roles = authorizations[rolesInput[a]];
      
      for(let r of roles){
        this.rolesAllowed.push(r);
      }
    }
    if (!this.rolesAllowed) {
      console.error('Unexpected error authroization not mapping', this.dirAuthorization);
    }
    this.execute();
  }

  public configurationSimpleRole(){
    this.rolesAllowed = authorizations[this.dirAuthorization];
    
    if (!this.rolesAllowed) {
      console.error('Unexpected error authroization not mapping', this.dirAuthorization);
    }
    this.execute();
  }


  execute(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    const rolesUser = this.authService.user.authorities;

    const isUserAuthorized = this.rolesAllowed && this.rolesAllowed.length > 0 ?
      rolesUser.some(role => this.rolesAllowed.includes(role)) :
      false;

     //console.group('Roles Authorizations');
     //console.log('is_Authenticated => ', isAuthenticated);
     //console.log('roles_user => ', rolesUser);
     //console.log('roles_allowed => ', this.rolesAllowed);
     //console.log('is_User_Authorized => ', isUserAuthorized);
     //console.groupEnd();
    
    if (isAuthenticated && isUserAuthorized && !this.hasView) {
      this.viewContainerRef.clear();
      this.hasView = false;
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
    this.flag.emit(this.hasView);
  }

}
