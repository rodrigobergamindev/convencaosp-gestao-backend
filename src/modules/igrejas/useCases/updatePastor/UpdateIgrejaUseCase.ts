
import { IIgrejaRepository, IUpdateIgrejaDTO } from "../../repositories/IIgrejaRepository";
import { insert } from "../../../../services/photos";



class UpdateIgrejaUseCase {

    constructor(private igrejasRepository: IIgrejaRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: IUpdateIgrejaDTO): Promise<void> {
        const {ri} = data
        const igrejaAlreadyExist = this.igrejasRepository.findByRI(ri)
    

        if(igrejaAlreadyExist){
           
            const igreja = {...data}
            this.igrejasRepository.update(igreja)
            
        }else{
            throw new Error('Igreja não cadastrado')
        }
        
    }
}

export {UpdateIgrejaUseCase}