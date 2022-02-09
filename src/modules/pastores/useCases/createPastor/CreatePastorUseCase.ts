
import { ICreatePastorDTO, IPastorRepository } from "../../repositories/IPastorRepository";
import { insert } from "../../../../services/photos";
import {db} from '../../../../services/firestore'

class CreatePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    uploadImage(file: Express.Multer.File, rm: string): Promise<string> {
       const url = insert(file, rm)
       return url
    }

    async execute(data: ICreatePastorDTO): Promise<void> {
        const {rm} = data
        const pastorAlreadyExist = await db.collection('Pastores').doc(rm)
        const namePhoto = `RM${rm}`

        if(!(await pastorAlreadyExist.get()).exists){

            if(data.foto){

                const url = await this.uploadImage(data.foto as Express.Multer.File, namePhoto)
                const pastor = {...data, foto: url}
                
                this.pastoresRepository.create(pastor)

            }else{
                const pastor = {...data}
                this.pastoresRepository.create(pastor)
            }
        }
        
    }
}

export {CreatePastorUseCase}