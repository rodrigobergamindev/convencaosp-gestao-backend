
import { IPastorRepository } from "../../repositories/IPastorRepository";

class DeletePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    execute(id: string): void {
        const pastorToDelete = this.pastoresRepository.findByID(id)

        if(!pastorToDelete){
            throw new Error("Pastor não encontrado")
        }
        this.pastoresRepository.delete(id)
    }
}

export {DeletePastorUseCase}