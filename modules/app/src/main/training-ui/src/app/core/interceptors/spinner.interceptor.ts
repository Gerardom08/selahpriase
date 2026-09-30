import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";

let solicitudesActivas = 0;

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const spinnerCC = inject(NgxSpinnerService);
    if (solicitudesActivas === 0) {
        spinnerCC.show();
    }
    solicitudesActivas++;

    return next(req).pipe(
        finalize(() => {
            solicitudesActivas = Math.max(0, solicitudesActivas - 1);
            if (solicitudesActivas === 0) {
                spinnerCC.hide();
            }
        })
    );
};
