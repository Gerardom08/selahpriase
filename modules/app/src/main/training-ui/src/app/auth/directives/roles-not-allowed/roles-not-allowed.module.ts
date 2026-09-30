import { NgModule } from "@angular/core";
import { RolesNotAllowedDirective } from "./roles-not-allowed.directive";

@NgModule({
    declarations: [RolesNotAllowedDirective],
    exports: [RolesNotAllowedDirective],
})
export class RolesNotAllowedModule { }
