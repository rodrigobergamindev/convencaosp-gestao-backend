
import { v4 as uuidV4 } from 'uuid'

interface IEndereco {
    tipo?: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
}


interface IContato {
    tipo: string;
    descricao: string;
}

interface IObservacao {
    titulo: string;
    descricao: string;
}


class Pastor {
    created_at?: Date;
    id?: string;

    rm: string;
    titulo: string;
    status?: string;
    nome: string;
    funcao?: string;
    endereco?: IEndereco[];
    contato?: IContato[];
    rg: string;
    cpf: string;
    nascimento: Date | string;
    credencial?: Date | string;
    consagracao?: Date | string; 
    igreja_sede: string; 
    observacao?: IObservacao[];
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


export { Pastor, IEndereco, IObservacao, IContato }