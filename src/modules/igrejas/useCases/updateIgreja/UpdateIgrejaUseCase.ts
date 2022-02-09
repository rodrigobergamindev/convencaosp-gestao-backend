
import { IIgrejaRepository, IUpdateIgrejaDTO } from "../../repositories/IIgrejaRepository";
import { insert } from "../../../../services/photos";
import {db} from '../../../../services/firestore'


class UpdateIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    async execute(data: IUpdateIgrejaDTO): Promise<void> {
        const {ri} = data
        const igrejaRef = await db.collection('Igrejas').doc(ri).get()
        const igrejaAlreadyExist = igrejaRef.exists
       
        if(igrejaAlreadyExist) {
          
            const igreja = {...data}
            this.igrejasRepository.update(igreja)
            
        }

        
    }
}

export {UpdateIgrejaUseCase}