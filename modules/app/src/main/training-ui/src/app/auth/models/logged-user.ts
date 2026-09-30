import { Domain } from "../domain/domain";

export class LoggedUser {
    idUser?: number;
    username?: string;
    fullName?: string;
    isSuperUser: boolean = false;
    daysRemaining?: number;
    domain: Domain;
    authorities: string[] = [];

    constructor() {
        this.domain = new Domain();
    }
}
