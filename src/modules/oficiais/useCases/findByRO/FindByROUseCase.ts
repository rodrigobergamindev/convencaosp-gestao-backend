import { DocumentData } from 'firebase-admin/firestore';
import { IOficialRepository } from "../../repositories/IOficialRepository";

class FindByROUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    } 

    execute(ro: string): Promise<DocumentData> {
        
        const oficial = this.oficiaisRepository.findByRO(ro)
        return oficial
    }
}

export {FindByROUseCase}