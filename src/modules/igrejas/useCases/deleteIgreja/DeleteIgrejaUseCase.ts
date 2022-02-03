
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";

class DeleteIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    execute(id: string): void {
        const igrejaToDelete = this.igrejasRepository.findByID(id)

        if(!igrejaToDelete){
            throw new Error("Igreja não existe")
        }
        this.igrejasRepository.delete(id)
    }
}

export {DeleteIgrejaUseCase}