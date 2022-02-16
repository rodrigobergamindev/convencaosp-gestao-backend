
import { ICreateIgrejaDTO, IIgrejaRepository } from "../../repositories/IIgrejaRepository";
import {db} from '../../../../services/firestore'

class CreateIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }
    async execute(data: ICreateIgrejaDTO): Promise<void> {
        const {ri} = data
        const igrejaRef = await db.collection('Igrejas').doc(ri).get()
        const igrejaAlreadyExist = igrejaRef.exists

        if(!igrejaAlreadyExist){
            const igreja = {...data}
           
            this.igrejasRepository.create(igreja)
        }
        
    }
}

export {CreateIgrejaUseCase}