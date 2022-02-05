

interface Pagamento {
    data: string | Date;
    tipo: string;
}


interface IAnuidade {
    valor_credencial: string;
    envio: string | Date;
    pagamentos?: Pagamento[]
}


interface IEndereco {
    tipo?: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
}

interface IContato {
    tipo?: string | null | undefined;
    descricao: string;
}

interface IObservacao {
    titulo: string | null;
    descricao: string;
}


class Oficial {
    created_at?: Date;
    id?: string;

    ro: string;
    titulo: string;
    status?: string;
    nome: string;
    funcao?: string;
    endereco?: IEndereco[]; 
    contato?: IContato[];
    rg: string;
    cpf: string;
    nascimento: Date | string;
    consagracao?: Date | string; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

    updated_at?: Date;
    updated_by?: string;

    constructor() {

        if(!this.created_at){
            this.created_at = new Date()
        }
    }
}


export { Oficial, IAnuidade, IObservacao, IEndereco, IContato }