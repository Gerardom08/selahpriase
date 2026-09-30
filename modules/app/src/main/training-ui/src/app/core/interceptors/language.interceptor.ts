import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { I18nLightService } from "../../shared/i18n/i18nLight.service";

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    
    constructor(
        private i18nService: I18nLightService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const lang = this.i18nService.getLanguage()?.keyBackend || 'en';

        const modifiedReq = req.clone({
            setHeaders: {
                'Accept-Language': lang
            }
        });
        return next.handle(modifiedReq);
    }
}