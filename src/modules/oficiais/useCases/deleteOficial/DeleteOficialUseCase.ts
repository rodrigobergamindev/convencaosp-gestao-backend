import { Oficial } from "../../model/Oficial";
import { IOficialRepository } from "../../repositories/IOficialRepository";

class DeleteOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    execute(ro: string): void {
        
        this.oficiaisRepository.delete(ro)
        
    }
}

export {DeleteOficialUseCase}