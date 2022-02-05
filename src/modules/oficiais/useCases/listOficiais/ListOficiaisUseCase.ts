import { Oficial } from "../../model/Oficial";
import { IOficialRepository } from "../../repositories/IOficialRepository";

class ListOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    } 

    execute(): Promise<Oficial[]> {

        const oficiais = this.oficiaisRepository.list()
        return oficiais
    }
}

export {ListOficialUseCase}