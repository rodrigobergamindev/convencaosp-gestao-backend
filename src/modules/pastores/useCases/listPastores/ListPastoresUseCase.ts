import { DocumentData } from "firebase-admin/firestore";
import { Pastor } from "../../model/Pastor";
import { IPastorRepository } from "../../repositories/IPastorRepository";

class ListPastoresUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    execute(): Promise<DocumentData[]> {

        const pastores = this.pastoresRepository.list()
        return pastores
    }
}

export {ListPastoresUseCase}