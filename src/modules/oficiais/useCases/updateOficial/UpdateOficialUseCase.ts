
import { IOficialRepository, IUpdateOficialDTO } from "../../repositories/IOficialRepository";
import { insert } from "../../../../services/photos";
import {db} from '../../../../services/firestore'

class UpdateOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: IUpdateOficialDTO): Promise<void> {
        const {ro} = data
        const oficialRef = await db.collection('Oficiais').doc(ro).get()
        const oficialAlreadyExist = oficialRef.data()
        const namePhoto = `RO${ro}`
       
        if(oficialAlreadyExist) {
            if(data.foto){

                const url = await this.uploadImage(data.foto as Express.Multer.File, namePhoto)
                const oficial = {...data, foto: url}
                this.oficiaisRepository.update(oficial) 
                
            }else{
                    const oficial = {...data}
                    this.oficiaisRepository.update(oficial)
            }
        }

        
    }
}

export {UpdateOficialUseCase}