
import { IIgrejaRepository, IUpdateIgrejaDTO } from "../../repositories/IIgrejaRepository";
import { insert } from "../../../../services/photos";



class UpdateIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    async execute(data: IUpdateIgrejaDTO): Promise<void> {
        const {ri, id} = data
        const igrejaAlreadyExist = this.igrejasRepository.findByID(id)
    

        if(!igrejaAlreadyExist){
            throw new Error('Igreja não cadastrado')
        }

        const igreja = {...data}
        this.igrejasRepository.update(igreja)
        
    }
}

export {UpdateIgrejaUseCase}