import { DocumentData } from 'firebase-admin/firestore';
import { IOficialRepository } from "../../repositories/IOficialRepository";

class ListOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    } 

    async execute(): Promise<DocumentData[]> {
        
        const oficiais = this.oficiaisRepository.list()
        return oficiais
    }
}

export {ListOficialUseCase}