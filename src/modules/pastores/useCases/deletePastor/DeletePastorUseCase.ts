
import { db } from "../../../../services/firestore";
import { IPastorRepository } from "../../repositories/IPastorRepository";

class DeletePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    async execute(rm: string): Promise<void> {
        const pastorRef = await db.collection('Pastores').doc(rm).get()
        const pastorData = pastorRef.data()

        if(pastorData){
            this.pastoresRepository.delete(rm)
        }
    }
}

export {DeletePastorUseCase}