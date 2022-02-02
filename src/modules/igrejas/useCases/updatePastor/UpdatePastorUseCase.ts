
import { IPastorRepository, IUpdatePastorDTO } from "../../repositories/IPastorRepository";
import { insert } from "../../../../services/photos";



class UpdatePastorUseCase {

    constructor(private pastoresRepository: IPastorRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): Promise<string> {
       const url = insert(file, ro)
       return url
    }

    async execute(data: IUpdatePastorDTO): Promise<void> {
        const {rm} = data
        const pastorAlreadyExist = this.pastoresRepository.findByRM(rm)
    

        if(pastorAlreadyExist){
            if(data.foto){
                const url = await this.uploadImage(data.foto as Express.Multer.File, rm)
                const pastor = {...data, foto: url}
                this.pastoresRepository.update(pastor)
                
            }else {
                const pastor = {...data}
                this.pastoresRepository.update(pastor)
            }
        }else{
            throw new Error('Pastor não cadastrado')
        }
        
    }
}

export {UpdatePastorUseCase}