
import { IPastorRepository } from "../../repositories/IPastorRepository";

class DeletePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    execute(rm: string): void {
        const pastorToDelete = this.pastoresRepository.findByRM(rm)

        if(pastorToDelete){
            this.pastoresRepository.delete(rm)
        }
        
    }
}

export {DeletePastorUseCase}