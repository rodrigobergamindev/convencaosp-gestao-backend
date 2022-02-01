
import { ICreateOficialDTO, IOficialRepository } from "../../repositories/IOficialRepository";

class CreateOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    execute(oficial: ICreateOficialDTO): void {
        const {ro} = oficial
        const oficialAlreadyExist = this.oficiaisRepository.findByRO(ro)

        if(!oficialAlreadyExist){
            this.oficiaisRepository.create(oficial)
        }
        
    }
}

export {CreateOficialUseCase}