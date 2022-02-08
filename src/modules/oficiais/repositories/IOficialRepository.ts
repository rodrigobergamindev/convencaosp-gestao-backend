import { DocumentData } from 'firebase-admin/firestore'


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

interface ICreateOficialDTO {


    ro: string;
    titulo: string;
    nome: string;
    funcao: string;
    status?: string;
    endereco?: IEndereco[];
    contato?: IContato[];
    rg: string;
    cpf: string;
    nascimento: string | Date;
    consagracao?: string | Date; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

}


interface IUpdateOficialDTO {

    ro: string;
    titulo: string;
    nome: string;
    funcao: string;
    status: string;
    endereco: IEndereco[];
    contato: IContato[];
    rg: string;
    cpf: string;
    nascimento: Date | string;
    consagracao: Date | string; 
    igreja_sede: string; 
    anuidade: IAnuidade;
    observacao: IObservacao[];
    foto: string | Express.Multer.File;
    
}

interface IImportOficial {

    ro: string;
    titulo: string;
    nome: string;
    funcao: string;
    status?: string;
    endereco?: IEndereco[];
    contato?: IContato[];
    rg: string;
    cpf: string;
    nascimento: string;
    consagracao?: string; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: IObservacao[];

}


interface IOficialRepository {

    findByRO(ro: string) : Promise<DocumentData> | null | undefined;
    list() : Promise<DocumentData[]> | undefined;
    create(data : ICreateOficialDTO) : void;
    update(data: IUpdateOficialDTO) : void;
    delete(ro: string) : void;
}

export { ICreateOficialDTO, IUpdateOficialDTO, IOficialRepository, IImportOficial}