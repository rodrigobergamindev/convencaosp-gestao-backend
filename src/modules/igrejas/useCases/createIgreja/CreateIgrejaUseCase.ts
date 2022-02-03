
import { ICreateIgrejaDTO, IIgrejaRepository } from "../../repositories/IIgrejaRepository";
import { insert } from "../../../../services/photos";

class CreateIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: ICreateIgrejaDTO): Promise<void> {
        const {ri} = data
        const igrejaAlreadyExist = this.igrejasRepository.findByRI(ri)
        


        if(!igrejaAlreadyExist){

           
            const igreja = {...data}
            this.igrejasRepository.create(igreja)
            
        }
        
    }
}

export {CreateIgrejaUseCase}