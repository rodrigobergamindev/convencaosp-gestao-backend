
import { IOficialRepository } from "../../repositories/IOficialRepository";

class DeleteOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    execute(id: string): void {
        const oficialToDelete = this.oficiaisRepository.findByID(id)

        if(!oficialToDelete){
            throw new Error("Oficial não encontrado")
        }
        this.oficiaisRepository.delete(id)
    }
}

export {DeleteOficialUseCase}