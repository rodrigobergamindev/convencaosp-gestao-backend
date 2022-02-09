
import { DocumentData } from "firebase-admin/firestore";
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";

class ListIgrejasUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    async execute(): Promise<DocumentData[]> {
        
        const igrejas = this.igrejasRepository.list()
        return igrejas
    }
}

export {ListIgrejasUseCase}