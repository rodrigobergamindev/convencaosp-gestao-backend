import { Oficial } from "../../model/Oficial";
import { IOficialRepository } from "../../repositories/IOficialRepository";

class ListOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    execute(): Oficial[] {

        const oficiais = this.oficiaisRepository.list()
        return oficiais as Oficial[]
    }
}

export {ListOficialUseCase}