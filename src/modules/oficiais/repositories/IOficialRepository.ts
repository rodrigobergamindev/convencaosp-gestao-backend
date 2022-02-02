import { Oficial } from '../model/Oficial'
import {IAnuidade} from '../../../types/IAnuidade'

interface ICreateOficialDTO {

    ro: string;
    funcao: string;
    nome: string;
    status?: string;
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
    anuidade?: IAnuidade;
    observacao?: string;
    foto?: string | Express.Multer.File;

}


interface IUpdateOficialDTO {

    created_at: Date;
    id: string;

    ro: string;
    funcao: string;
    status?: string;
    nome: string;
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
    anuidade?: IAnuidade;
    observacao?: string;
    foto?: string | Express.Multer.File;

    updated_at?: Date;
    updated_by?: string;
    
}




interface IOficialRepository {

    findByRO(ro: string) : Oficial | null | undefined;
    list() : Oficial[] | null;
    create(data : ICreateOficialDTO) : void;
    update(data: Oficial) : void;
    delete(ro: string) : void;
}

export { ICreateOficialDTO, IUpdateOficialDTO, IOficialRepository}