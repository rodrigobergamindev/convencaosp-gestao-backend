import { DocumentData } from 'firebase-admin/firestore';
import { IPastorRepository } from "../../repositories/IPastorRepository";

class FindByRMUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    } 

    async execute(rm: string): Promise<DocumentData> {
        
        const pastor = this.pastoresRepository.findByRM(rm)
        return pastor
    }
}

export {FindByRMUseCase}