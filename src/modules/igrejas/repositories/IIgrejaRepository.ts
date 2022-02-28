import { DocumentData } from "firebase-admin/firestore";


interface ICreateIgrejaDTO {

    ri: string;
    nome: string;
    cnpj: string;
    tipo: string;
    igreja_sede: string;
    endereco: IEndereco[];
    contato: IContato[];
    dirigente: string;
    presidente: string;
    templo: string;
    membros: string;
    superintendencia: ISuperintendencia;
    contribuicoes: IContribuicoes;
    observacao?: IObservacao[];

}


interface IUpdateIgrejaDTO {

    ri: string;
    nome: string;
    cnpj: string;
    tipo: string;
    igreja_sede: string;
    endereco: IEndereco[];
    contato: IContato[];
    dirigente: string;
    presidente: string;
    templo: string;
    membros: string;
    superintendencia: ISuperintendencia;
    contribuicoes: IContribuicoes;
    observacao: IObservacao[];

    
}


interface IEndereco {
    tipo: string | null | undefined;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
}

interface IContato {
    tipo: string | null | undefined;
    descricao: string;
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
    titulo: string | null | undefined;
    descricao: string;
}




interface IIgrejaRepository {

    findByRI(ri: string) : Promise<DocumentData> | null | undefined;
    list() : Promise<DocumentData[]> | null;
    create(data : ICreateIgrejaDTO) : void;
    update(data: IUpdateIgrejaDTO) : void;
    delete(id: string) : void;
}

export { ICreateIgrejaDTO, IUpdateIgrejaDTO, IIgrejaRepository, IObservacao, IContato, IContribuicoes, IEndereco, ISuperintendencia}