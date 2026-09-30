import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { authorizations } from '../config/authorizations';

@Directive({
    selector: '[roles-allowed]',
})
export class RolesAllowedDirective {

    @Input('roles-allowed') dirAuthorization: string = '';
    rolesAllowed: string[] = [];
    hashView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
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

        if (isAuthenticated && isUserAuthorized && !this.hashView) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            this.hashView = true;
        } else {
            this.viewContainerRef.clear();
            this.hashView = false;
        }
    }
}
