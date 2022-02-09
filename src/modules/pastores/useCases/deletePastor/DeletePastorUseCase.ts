
import { db } from "../../../../services/firestore";
import { IPastorRepository } from "../../repositories/IPastorRepository";

class DeletePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    async execute(rm: string): Promise<void> {
        const pastorRef = await db.collection('Pastores').doc(rm).get()
        const pastorAlreadyExist = await pastorRef.exists

        if(pastorAlreadyExist){
            this.pastoresRepository.delete(rm)
        }
    }
}

export {DeletePastorUseCase}