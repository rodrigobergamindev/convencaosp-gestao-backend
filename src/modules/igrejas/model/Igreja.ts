
import { v4 as uuidV4 } from 'uuid'

interface IEndereco {
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

interface ISuperintendencia {
    nome: string;
    localizacao: string;
    regiao: string;
}

interface IContribuicoes {
    dd: string;
    pn: string;
    taxa: string;
}

interface IObservacao {
    titulo: string;
    descricao: string;
}


class Igreja {
    created_at?: Date;
    id?: string;

    ri: string;
    nome: string;
    cnpj: string;
    tipo: string;
    igreja_sede: string;
    endereco: IEndereco[];
    contato: IContato[];
    email: string;
    dirigente: string;
    presidente: string;
    templo: string;
    superitendencia: ISuperintendencia;
    constribuicoes: IContribuicoes;
    observacao: IObservacao[];

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


export { Igreja, ISuperintendencia, IObservacao, IContato, IEndereco, IContribuicoes }