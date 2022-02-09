import { DocumentData } from 'firebase-admin/firestore';
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";

class FindByRIUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    } 

    async execute(ri: string): Promise<DocumentData> {
        
        const igreja = this.igrejasRepository.findByRI(ri)
        return igreja
    }
}

export {FindByRIUseCase}