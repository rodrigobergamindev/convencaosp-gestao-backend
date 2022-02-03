
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";

class DeleteIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    execute(ri: string): void {
        const igrejaToDelete = this.igrejasRepository.findByRI(ri)

        if(igrejaToDelete){
            this.igrejasRepository.delete(ri)
        }
        
    }
}

export {DeleteIgrejaUseCase}