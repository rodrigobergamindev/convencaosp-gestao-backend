
import { IOficialRepository, IUpdateOficialDTO } from "../../repositories/IOficialRepository";
import { insert } from "../../../../services/photos";
import { Oficial } from "../../model/Oficial";


class UpdateOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: IUpdateOficialDTO): Promise<void> {
        const {ro, id} = data
        const oficialAlreadyExist = this.oficiaisRepository.findByID(id)
    

        if(!oficialAlreadyExist){
            if(data.foto){
                const url = await this.uploadImage(data.foto as Express.Multer.File, ro)
                const oficial = {...data, foto: url}
                this.oficiaisRepository.update(oficial) 
            }
                const oficial = {...data}
                this.oficiaisRepository.update(oficial)
            
        }else{
            throw new Error('Oficial não cadastrado')
        }
        
    }
}

export {UpdateOficialUseCase}