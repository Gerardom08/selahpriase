export class Domain {
    id: number | null = null;
    code?: string;
    name: string = '';
    parent!: number;
    parentName!:string;
    principalId!:number;
    principalName!:string;
    idHierarchy?: number;    
    currentLevel?:number;
    documentVersion?: string;
    
    constructor() {

    }
}

