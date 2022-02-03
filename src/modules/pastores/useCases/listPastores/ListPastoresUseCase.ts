import { Pastor } from "../../model/Pastor";
import { IPastorRepository } from "../../repositories/IPastorRepository";

class ListPastoresUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    execute(): Pastor[] {

        const pastores = this.pastoresRepository.list()
        return pastores as Pastor[]
    }
}

export {ListPastoresUseCase}