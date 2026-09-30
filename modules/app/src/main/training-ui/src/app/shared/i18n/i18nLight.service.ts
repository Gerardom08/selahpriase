import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class I18nLightService{
    private currentLanguage: any;
    public data: { [key: string]: string } = {};
    private languageChangedSubject = new BehaviorSubject<any>(null);
    public languageChanged$: Observable<any> = this.languageChangedSubject.asObservable();

    public setLanguage(language:any){
        this.currentLanguage=language;
        this.languageChangedSubject.next(language);
    }

    public getLanguage(){
        return this.currentLanguage;
    }

    public setData(data:any){
        this.data=data;
    }

    public getTranslation(phrase: string): string {
        return this.data && this.data[phrase] ? this.data[phrase] : phrase;
    } 
}
