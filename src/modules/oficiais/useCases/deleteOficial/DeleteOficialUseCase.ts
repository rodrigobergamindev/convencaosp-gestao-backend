
import { IOficialRepository } from "../../repositories/IOficialRepository";

class DeleteOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    execute(ro: string): void {
        const oficialToDelete = this.oficiaisRepository.findByRO(ro)

        if(oficialToDelete){
            this.oficiaisRepository.delete(ro)
        }
        
    }
}

export {DeleteOficialUseCase}