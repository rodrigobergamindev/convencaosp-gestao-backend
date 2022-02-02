
import { v4 as uuidV4 } from 'uuid'
import {IAnuidade} from '../../../types/IAnuidade'



class Oficial {
    created_at?: Date;
    id?: string;

    ro: string;
    funcao: string;
    status?: string;
    nome: string;
    dirigente?: string;
    endereco: string; 
    bairro: string;
    cidade: string;
    uf: string;
    cep: string; 
    telefone?: string;
    email?: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    consagracao?: Date; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: string;
    foto?: string | Express.Multer.File;

    updated_at?: Date;
    updated_by?: string;

    constructor() {
        if(!this.id) { 
            this.id = uuidV4()
        }

        if(!this.created_at){
            this.created_at = new Date()
        }
    }
}


export { Oficial }