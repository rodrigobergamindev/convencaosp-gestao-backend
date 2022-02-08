import { DocumentData } from 'firebase-admin/firestore';
import { Oficial } from "../../model/Oficial";
import { IOficialRepository } from "../../repositories/IOficialRepository";

class ListOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    } 

    execute(): Promise<DocumentData[]> {
        
        const oficiais = this.oficiaisRepository.list()
        return oficiais
    }
}

export {ListOficialUseCase}