
import { IPastorRepository } from "../../repositories/IPastorRepository";

class DeletePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    execute(rm: string): void {
        //const pastorToDelete = this.pastoresRepository.findByID(id)

        this.pastoresRepository.delete(rm)
    }
}

export {DeletePastorUseCase}