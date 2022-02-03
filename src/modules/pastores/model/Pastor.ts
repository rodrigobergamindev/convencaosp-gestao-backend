
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
    numero: string;
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
    email?: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    credencial?: Date;
    consagracao?: Date; 
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