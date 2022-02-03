import { Igreja, IEndereco, IObservacao, IContato, ISuperintendencia, IContribuicoes } from '../model/Igreja'


interface ICreateIgrejaDTO {

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

}


interface IUpdateIgrejaDTO {

    created_at: Date;
    id: string;

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
    
}




interface IIgrejaRepository {

    findByRI(ri: string) : Igreja | null | undefined;
    list() : Igreja[] | null;
    create(data : ICreateIgrejaDTO) : void;
    update(data: IUpdateIgrejaDTO) : void;
    delete(rm: string) : void;
}

export { ICreateIgrejaDTO, IUpdateIgrejaDTO, IIgrejaRepository}