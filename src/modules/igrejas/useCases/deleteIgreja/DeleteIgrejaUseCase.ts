
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";
import {db} from '../../../../services/firestore'
class DeleteIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    async execute(ri: string): Promise<void> {
        const igrejaRef = await db.collection('Igrejas').doc(ri).get()
        const oficialData = igrejaRef.data()

        if(oficialData){
            this.igrejasRepository.delete(ri)
        }
    }
}

export {DeleteIgrejaUseCase}