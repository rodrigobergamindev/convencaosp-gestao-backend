
import { ICreateOficialDTO, IOficialRepository } from "../../repositories/IOficialRepository";
import { insert } from "../../../../services/photos";

class CreateOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: ICreateOficialDTO): Promise<void> {
        const {ro} = data
        //const oficialAlreadyExist = this.oficiaisRepository.findByRO(ro)
        

            if(data.foto){
                const url = await this.uploadImage(data.foto as Express.Multer.File, ro)
                const oficial = {...data, foto: url}
                
                this.oficiaisRepository.create(oficial)

            }else{
                const oficial = {...data}
                this.oficiaisRepository.create(oficial)
            }
        
        
    }
}

export {CreateOficialUseCase}