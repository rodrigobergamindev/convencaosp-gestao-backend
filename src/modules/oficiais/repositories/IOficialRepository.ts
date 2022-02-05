import { Oficial } from '../model/Oficial'
import {IEndereco, IObservacao, IContato, IAnuidade} from '../model/Oficial'

interface ICreateOficialDTO {

    ro: string;
    titulo: string;
    nome: string;
    funcao?: string;
    dirigente?: string;
    endereco?: IEndereco[];
    contato?: IContato[];
    rg: string;
    cpf: string;
    nascimento: string | Date;
    consagracao?: string | Date; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: IObservacao[];
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
    rg: string;
    cpf: string;
    nascimento: Date | string;
    consagracao?: Date | string; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: IObservacao[];
    foto?: string | Express.Multer.File;

    updated_at?: Date;
    updated_by?: string;
    
}




interface IOficialRepository {

    findByRO(ro: string) : Oficial | null | undefined;
    findByID(id: string) : Oficial | null | undefined;
    list() : Promise<null> | undefined;
    create(data : ICreateOficialDTO) : void;
    update(data: IUpdateOficialDTO) : void;
    delete(id: string) : void;
}

export { ICreateOficialDTO, IUpdateOficialDTO, IOficialRepository}