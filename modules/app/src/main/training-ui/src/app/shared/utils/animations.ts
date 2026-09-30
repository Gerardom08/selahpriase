import { animate, style, transition, trigger } from "@angular/animations";

export const slideState = trigger('slideTrigger', [
    transition('slideUp => slideDown', [
        style({
            transform: 'translateY(-100%)',
        }),
        animate(
            '500ms ease-out',
            style({
                transform: 'translateY(0%)',
            })
        ),
    ]),
    transition('slideDown => slideUp', [
        style({
            transform: 'translateY(0%)',
        }),
        animate('500ms', style({ transform: 'translateY(-100%)' })),
    ]),
]);
