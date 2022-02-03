import { Oficial } from '../model/Oficial'
import {IEndereco, IObservacao, IContato, IAnuidade} from '../model/Oficial'

interface ICreateOficialDTO {

    ro: string;
    titulo: string;
    nome: string;
    funcao?: string;
    dirigente?: string;
    endereco?: IEndereco;
    contato?: IContato;
    email?: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    consagracao?: Date; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: IObservacao;
    foto?: string | Express.Multer.File;

}


interface IUpdateOficialDTO {

    created_at: Date;
    id: string;

    ro: string;
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
    anuidade?: IAnuidade;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

    updated_at?: Date;
    updated_by?: string;
    
}




interface IOficialRepository {

    findByRO(ro: string) : Oficial | null | undefined;
    list() : Oficial[] | null | undefined;
    create(data : ICreateOficialDTO) : void;
    update(data: IUpdateOficialDTO) : void;
    delete(ro: string) : void;
}

export { ICreateOficialDTO, IUpdateOficialDTO, IOficialRepository}