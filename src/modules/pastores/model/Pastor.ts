
import { v4 as uuidV4 } from 'uuid'




class Pastor {
    created_at?: Date;
    id?: string;

    rm: string;
    titulo: string;
    status?: string;
    nome: string;
    funcao?: string;
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
    credencial?: Date;
    consagracao?: Date; 
    igreja_sede: string; 
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


export { Pastor }