import { Pastor, IEndereco, IContato, IObservacao } from '../model/Pastor'


interface ICreatePastorDTO {

    rm: string;
    titulo: string;
    nome: string;
    funcao?: string;
    dirigente?: string;
    endereco?: IEndereco[];
    contato?: IContato[];
    email?: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    consagracao?: Date; 
    igreja_sede: string; 
    credencial: Date;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

}


interface IUpdatePastorDTO {

    created_at: Date;
    id: string;

    rm: string;
    titulo: string;
    nome: string;
    funcao?: string;
    dirigente?: string;
    endereco?: IEndereco[];
    contato?: IContato[];
    rg: string;
    cpf: string;
    nascimento: Date | string;
    consagracao?: Date | string; 
    igreja_sede: string; 
    credencial: Date | string;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

    updated_at?: Date;
    updated_by?: string;
    
}




interface IPastorRepository {

    findByRM(rm: string) : Pastor | null | undefined;
    findByID(id: string) : Pastor | null | undefined;
    list() : Pastor[] | null;
    create(data : ICreatePastorDTO) : void;
    update(data: IUpdatePastorDTO) : void;
    delete(id: string) : void;
}

export { ICreatePastorDTO, IUpdatePastorDTO, IPastorRepository}