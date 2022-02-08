
import { IOficialRepository } from "../../repositories/IOficialRepository";
import {db} from '../../../../services/firestore'

class DeleteOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    async execute(ro: string): Promise<void> {
        const oficialRef = await db.collection('Oficiais').doc(ro).get()
        const oficialData = oficialRef.data()

        if(oficialData){
            this.oficiaisRepository.delete(ro)
        }
    }
}

export {DeleteOficialUseCase}