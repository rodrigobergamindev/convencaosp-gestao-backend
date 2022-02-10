
import { ICreateOficialDTO, IOficialRepository } from "../../repositories/IOficialRepository";
import { insert } from "../../../../services/photos";
import {db} from '../../../../services/firestore'

class CreateOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: ICreateOficialDTO): Promise<void> {
        const {ro} = data
        const oficialRef = await db.collection('Oficiais').doc(ro).get()
        const oficialAlreadyExist = oficialRef.exists
        const namePhoto = `RO${ro}`
        

       if(!oficialAlreadyExist){
        if((data.foto !== null) || (data.foto !== undefined)){
            const url = await this.uploadImage(data.foto as Express.Multer.File, namePhoto)
            const oficial = {...data, foto: url}
            
            this.oficiaisRepository.create(oficial)

        }else{
            const oficial = {...data}
            this.oficiaisRepository.create(oficial)
        }
       }

    
        
    }
}

export {CreateOficialUseCase}