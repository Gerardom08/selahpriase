import { NgModule } from "@angular/core";

import { I18nPipe } from "./i18n.pipe";
import { CommonModule } from "@angular/common";
import { JsonApiService } from "../../core/services/json-api.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    I18nPipe
  ],
  exports: [I18nPipe],
  providers: [JsonApiService]

})
export class I18nModule { }