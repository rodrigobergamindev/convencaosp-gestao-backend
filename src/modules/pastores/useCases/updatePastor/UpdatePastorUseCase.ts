
import { IPastorRepository, IUpdatePastorDTO } from "../../repositories/IPastorRepository";
import { insert } from "../../../../services/photos";
import { db } from "../../../../services/firestore";



class UpdatePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    uploadImage(file: Express.Multer.File, rm: string): Promise<string> {
       const url = insert(file, rm)
       return url
    }

    async execute(data: IUpdatePastorDTO): Promise<void> {
        const {rm} = data
        const pastorRef = await db.collection('Oficiais').doc(rm).get()
        const pastorAlreadyExist = pastorRef.data()
        const namePhoto = `RM${rm}`

        if(pastorAlreadyExist){
            if(data.foto){
                const url = await this.uploadImage(data.foto as Express.Multer.File, namePhoto)
                const pastor = {...data, foto: url}
                this.pastoresRepository.update(pastor)
                
            }
                const pastor = {...data}
                this.pastoresRepository.update(pastor)
            
        }
    
    }

}

export {UpdatePastorUseCase}