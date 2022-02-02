import { Oficial } from '../model/Oficial'
import {IAnuidade} from '../../../types/IAnuidade'

interface ICreateOficialDTO {

    ro: string;
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
    anuidade?: IAnuidade;
    observacao?: string;
    foto?: string | Express.Multer.File;

}


interface IUpdateOficialDTO {

    created_at: Date;
    id: string;

    ro: string;
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