
import { IPastorRepository } from "../../repositories/IPastorRepository";

class DeletePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    execute(id: string): void {
        const pastorToDelete = this.pastoresRepository.findByID(id)

        if(pastorToDelete){
            this.pastoresRepository.delete(id)
        }
        
    }
}

export {DeletePastorUseCase}