import { Pastor } from '../model/Pastor'
import {IAnuidade} from '../../../types/IAnuidade'

interface ICreatePastorDTO {

    rm: string;
    titulo: string;
    nome: string;
    funcao?: string;
    dirigente?: string;
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
    consagracao?: Date; 
    igreja_sede: string; 
    credencial: Date;
    observacao?: string;
    foto?: string | Express.Multer.File;

}


interface IUpdatePastorDTO {

    created_at: Date;
    id: string;

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
    consagracao?: Date; 
    igreja_sede: string; 
    credencial: Date;
    observacao?: string;
    foto?: string | Express.Multer.File;

    updated_at?: Date;
    updated_by?: string;
    
}




interface IPastorRepository {

    findByRM(rm: string) : Pastor | null | undefined;
    list() : Pastor[] | null;
    create(data : ICreatePastorDTO) : void;
    update(data: IUpdatePastorDTO) : void;
    delete(rm: string) : void;
}

export { ICreatePastorDTO, IUpdatePastorDTO, IPastorRepository}