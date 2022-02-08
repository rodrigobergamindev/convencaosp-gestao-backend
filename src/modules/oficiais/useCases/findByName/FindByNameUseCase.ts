import { DocumentData } from 'firebase-admin/firestore';
import { IOficialRepository } from "../../repositories/IOficialRepository";

class FindByNameUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    } 

    execute(nome: string): Promise<DocumentData> {
        
        const oficiais = this.oficiaisRepository.findByName(nome)
        return oficiais
    }
}

export {FindByNameUseCase}