import { DocumentData } from 'firebase-admin/firestore'


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

interface ICreatePastorDTO {

    rm: string;
    status: string;
    titulo: string;
    nome: string;
    funcao: string;
    endereco: IEndereco[];
    contato: IContato[];
    rg: string;
    cpf: string;
    nascimento: string;
    consagracao: string; 
    igreja_sede: string; 
    credencial?: string;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

}

interface IUpdatePastorDTO {

    rm: string;
    status: string;
    titulo: string;
    nome: string;
    funcao: string;
    endereco: IEndereco[];
    contato: IContato[];
    rg: string;
    cpf: string;
    nascimento: string;
    consagracao: string; 
    igreja_sede: string; 
    credencial?: string;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

}





interface IPastorRepository {

    findByRM(rm: string) : Promise<DocumentData> | null | undefined;
    list() : Promise<DocumentData[]> | null;
    create(data : ICreatePastorDTO) : void;
    update(data: IUpdatePastorDTO) : void;
    delete(rm: string) : void;
}

export { ICreatePastorDTO, IUpdatePastorDTO, IPastorRepository, IContato, IEndereco, IObservacao}