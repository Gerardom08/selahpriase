import { NgModule } from "@angular/core";
import { RolesAllowedDirective } from "./roles-allowed.directive";


@NgModule({
    imports: [
        RolesAllowedDirective,
    ],
    exports: [
        RolesAllowedDirective,
    ]
})
export class DirectivesModule { }