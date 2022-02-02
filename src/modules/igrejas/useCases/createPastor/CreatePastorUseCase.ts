
import { ICreatePastorDTO, IPastorRepository } from "../../repositories/IPastorRepository";
import { insert } from "../../../../services/photos";

class CreatePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: ICreatePastorDTO): Promise<void> {
        const {rm} = data
        const pastorAlreadyExist = this.pastoresRepository.findByRM(rm)
        


        if(!pastorAlreadyExist){

            if(data.foto){

                const url = await this.uploadImage(data.foto as Express.Multer.File, rm)
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