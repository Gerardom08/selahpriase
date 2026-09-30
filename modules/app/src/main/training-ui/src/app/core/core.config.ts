export const config: any = {
    defaultLocale: 'es',
    API_URL: 'assets/api',
    menu_speed: 200,
    smartSkin: 'smart-style-6',
    skins: [
        {
            name: 'smart-style-1',
            logo: 'assets/img/logo.png',
            skinBtnClass: 'btn btn-block btn-xs txt-color-white',
            style: {
                background: '#3A4558'
            },
            label: 'Dark Elegance'
        },
        {
            name: 'smart-style-6',
            logo: 'assets/img/logo.png',
            skinBtnClass: 'btn btn-xs btn-block txt-color-white margin-top-5',
            style: {
                background: 'rgba(153, 179, 204, 0.2)'
            },
            label: 'Glass'
        },
    ],
    debugState: false,
    debugStyle: 'font-weight: bold; color: #00f;',
    debugStyle_green: 'font-weight: bold; font-style:italic; color: #46C246;',
    debugStyle_red: 'font-weight: bold; color: #ed1c24;',
    debugStyle_warning: 'background-color:yellow',
    debugStyle_success: 'background-color:green; font-weight:bold; color:#fff;',
    debugStyle_error: 'background-color:#ed1c24; font-weight:bold; color:#fff;',

    // new app config
    layout: 'vertical', // vertical, horizontal
    subLayout: '', // horizontal-2
    collapseMenu: false,
    layoutType: 'menu-light', // menu-dark, menu-light, dark
    headerBackColor: 'background-blue', // background-blue, background-red, background-purple, background-info, background-dark
    rtlLayout: false,
    navFixedLayout: false,
    headerFixedLayout: false,
    boxLayout: false
};
