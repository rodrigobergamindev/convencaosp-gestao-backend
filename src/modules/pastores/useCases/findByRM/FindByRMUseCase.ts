import { DocumentData } from 'firebase-admin/firestore';
import { IPastorRepository } from "../../repositories/IPastorRepository";

class FindByRMUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    } 

    async execute(rm: string): Promise<DocumentData> {
        
        const oficial = this.pastoresRepository.findByRM(rm)
        return oficial
    }
}

export {FindByRMUseCase}