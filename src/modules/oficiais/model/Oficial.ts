
import { v4 as uuidV4 } from 'uuid'
import {IAnuidade} from '../../../types/IAnuidade'



class Oficial {
    created_at: Date;
    id?: string;

    ro: string;
    funcao: string;
    nome: string;
    dirigente: string;
    endereco: string; 
    bairro: string;
    cidade: string;
    uf: string;
    cep: string; 
    telefone: string;
    email: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    consagracao: Date; 
    ri_igreja: string; 
    anuidade: IAnuidade;
    observacao: string;
    foto: string;

    update: Date;
    update_by: string;

    constructor() {
        if(!this.id) { 
            this.id = uuidV4()
        }
    }
}


export { Oficial }