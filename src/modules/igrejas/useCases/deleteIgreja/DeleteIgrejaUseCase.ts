
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";

class DeleteIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    execute(id: string): void {
        const igrejaToDelete = this.igrejasRepository.findByID(id)

        if(igrejaToDelete){
            this.igrejasRepository.delete(id)
        }
        
    }
}

export {DeleteIgrejaUseCase}