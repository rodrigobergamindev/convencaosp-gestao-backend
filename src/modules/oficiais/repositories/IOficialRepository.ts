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

interface IOficialRepository {

    findByName(nome: string) : Oficial | null | undefined;
    findByRO(ro: string) : Oficial | null | undefined;
    list() : Oficial[] | null;
    create(data : ICreateOficialDTO) : void;
    update(oficial: Oficial) : void;
    delete(ro: string) : void;
}

export { ICreateOficialDTO, IOficialRepository}