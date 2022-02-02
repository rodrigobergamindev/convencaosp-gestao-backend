import { Pastor } from "../../model/Pastor";
import { IPastorRepository } from "../../repositories/IPastorRepository";

class ListPastoresUseCase {

    constructor(private oficiaisRepository: IPastorRepository){

    }

    execute(): Pastor[] {

        const oficiais = this.oficiaisRepository.list()
        return oficiais as Pastor[]
    }
}

export {ListPastoresUseCase}