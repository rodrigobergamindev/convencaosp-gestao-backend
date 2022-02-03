import { Igreja } from "../../model/Igreja";
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";

class ListIgrejasUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    execute(): Igreja[] {

        const igrejas = this.igrejasRepository.list()
        return igrejas as Igreja[]
    }
}

export {ListIgrejasUseCase}