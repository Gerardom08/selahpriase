import { Injectable, ApplicationRef } from '@angular/core';

import { languages } from './languages.model';
import { Subject } from 'rxjs';
import { JsonApiService } from '../../core/services/json-api.service';
import { config } from '../../core/core.config';
import { I18nLightService } from './i18nLight.service';

@Injectable({
  providedIn:'root'
})
export class I18nService {

  public state;
  public data: { [key: string]: string } = {};
  public currentLanguage: any;

  constructor(
    private jsonApiService: JsonApiService, 
    private ref: ApplicationRef,
    private i18nLightService:I18nLightService
  ) {
    this.state = new Subject();
    this.initLanguage(config.defaultLocale || 'es');
  }

  private fetch(locale: any) {
    this.jsonApiService.fetch(`/langs/${locale}.json`)
      .subscribe((data: any) => {
        this.data = data;
        this.i18nLightService.setData(data);
        this.state.next(data);
        this.ref.tick()
      })
  }

  private initLanguage(locale: string) {
    let language = languages.find((it: { key: string; }) => {
      return it.key == locale
    });
    if (language) {
      this.setLanguage(language);
    } else {
      throw new Error(`Incorrect locale used for I18nService: ${locale}`);
    }
  }

  setLanguage(language: any) {
    this.currentLanguage = language;
    this.i18nLightService.setLanguage(language);
    this.fetch(language.key);
  }

  subscribe(sub: any, err: any) {
    return this.state.subscribe(sub, err)
  }

  public getTranslation(phrase: string): string {
    return this.data && this.data[phrase] ? this.data[phrase] : phrase;
  }

  public getTranslationwithparams(phrase: string, params?: { [key: string]: string }): string {
    let translation = this.data && this.data[phrase] ? this.data[phrase] : phrase;
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        translation = translation.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value);
      });
    }

    return translation;
  }
}
