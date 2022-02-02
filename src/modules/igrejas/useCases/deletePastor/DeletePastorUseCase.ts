
import { IPastorRepository } from "../../repositories/IPastorRepository";

class DeletePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    execute(ro: string): void {
        const pastorToDelete = this.pastoresRepository.findByRM(ro)

        if(pastorToDelete){
            this.pastoresRepository.delete(ro)
        }
        
    }
}

export {DeletePastorUseCase}