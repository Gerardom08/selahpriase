import { Domain } from "./domain";

export class Usuario {
    idUser?: number;
    username?: string;
    password?: string;
    fullName?: string;
    domain: Domain;
    authorities: string[] = [];
    isSuperUser: boolean = false;
    daysRemaining?: number;
    idDomainsList:number[] = [];
    constructor() {
        this.domain = new Domain();
    }
}
