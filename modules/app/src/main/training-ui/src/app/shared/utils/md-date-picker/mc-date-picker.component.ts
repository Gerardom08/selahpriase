import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnDestroy, Output } from "@angular/core";
import { I18nService } from "../../i18n/i18n.service";
import { I18nPipe } from "../../i18n/i18n.pipe";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { I18nModule } from "../../i18n/i18n.module";
import { SharedModule } from "../../shared.module";
import { Subscription } from "rxjs";

@Component({
    selector: 'mc-date-picker',
    templateUrl: './mc-date-picker.component.html',
    standalone: true,
    imports:[
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        I18nModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => McDatePickerCopmonent),
            multi: true
        },
    ],
    styles:[
        `.datepicker-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1100;
        }`,
        `.datepicker-backdrop {
            transition: opacity 0.3s ease;
            opacity: 1;
        }`
    ]
})
export class McDatePickerCopmonent implements AfterViewInit, OnDestroy, ControlValueAccessor{
    @Output() onDateSelected = new EventEmitter();
    @Input() invalid: boolean = false;

    private i18nPipe?:any;
    public language:string = 'US';
    public datePickerMethod!:any;
    public onChange: any;
    public onTouched: any;
    public value: string = '';
    public lastValue!: string ;
    public languageSubscription!:Subscription;
    public isDatepickerOpen = false;

    public constructor(
        private i18nService: I18nService
    ){
        this.i18nPipe=new I18nPipe(this.i18nService);
        this.languageSubscription = this.i18nService.state.subscribe(response=>{
            this.initDatePicker();
        });
    }

    public ngAfterViewInit(): void {
        this.initDatePicker();
    }

    public ngOnDestroy(): void {
        if(this.languageSubscription) this.languageSubscription.unsubscribe();
    }

    public initDatePicker(){
        this.removeInstances();
        this.language=this.i18nService.currentLanguage.key.toUpperCase();
        let days = this.getDays();
        let months = this.getMonths();
        let clear = this.i18nPipe.transform('Clear'),
            cancel = this.i18nPipe.transform('Cancel');

        this.datePickerMethod = MCDatepicker.create({
            el: "#_dm-mcDatepicker-method",
            bodyType: "modal",
            dateFormat: "yyyy-mm-dd",
            closeOnBlur: false,
            customWeekDays: days,
            customMonths: months,
            customClearBTN: clear,
            customCancelBTN: cancel
        });
        
        document.querySelector( "#_dm-mcDatepicker-btn" )?.addEventListener( "click", () => {
            this.isDatepickerOpen=true;
            this.datePickerMethod.open();
        });
        this.datePickerMethod.onSelect((date:any, formatedDate:any) => {
            if(this.value && !formatedDate){
                formatedDate=this.value;
            }
            this.invalid=!formatedDate;
            this.lastValue=formatedDate;
            this.datePickerMethod.setFullDate(new Date(formatedDate+'T00:00:00-06:00'));
            this.onDateSelected.emit(formatedDate);
        });
        this.datePickerMethod.onCancel(() => {
            if(this.value && !this.lastValue) {
                this.datePickerMethod.setFullDate(new Date(this.value+'T00:00:00-06:00'));
                this.lastValue=this.value??"";
            }else if(this.lastValue) this.datePickerMethod.setFullDate(new Date(this.lastValue+'T00:00:00-06:00'));
            this.isDatepickerOpen=false;
            this.onDateSelected.emit(this.lastValue);
        });
        this.datePickerMethod.onOpen(()=>{
            this.isDatepickerOpen=true;
        });
        this.datePickerMethod.onClose(()=>{
            this.isDatepickerOpen=false;
        })
    }

    public removeInstances(){
        if(this.datePickerMethod) MCDatepicker.remove(this.datePickerMethod);
    }

    public getDays(){
        let months:any[]=[];
        switch(this.language){
            case 'ES':
                months = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
            break;
            default:
                months = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            break;
        }
        return months;
    }

    public getMonths(){
        let days:any[]=[];
        switch(this.language){
            case 'ES':
                days = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            break;
            default:
                days = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                        'August', 'September', 'October', 'November', 'December'];
            break;
        }
        return days;
    }

    writeValue(value: string): void {
        this.value = value;
    }
    
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {

    }

    closeDatepicker() {
        this.datePickerMethod.close();
        this.isDatepickerOpen = false;
    }
}