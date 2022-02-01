import { Oficial } from '../model/Oficial'
import {IAnuidade} from '../../../types/IAnuidade'

interface ICreateOficialDTO {

    ro: string;
    funcao: string;
    nome: string;
    dirigente: string;
    endereco: string; 
    bairro: string;
    cidade: string;
    uf: string;
    cep: string; 
    telefone: string;
    email: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    consagracao: Date; 
    ri_igreja: string; 
    anuidade: IAnuidade;
    observacao: string;
    foto?: string;

}

interface IOficialRepository {

    findByName(nome: string) : Oficial | null | undefined;
    findByRO(ro: number) : Oficial | null | undefined;
    list() : Oficial[] | null;
    create(data : ICreateOficialDTO) : void;
    update(ro : number, oficial: Oficial) : void;
    delete(ro: number) : void;
}

export { ICreateOficialDTO, IOficialRepository}