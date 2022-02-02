
import { ICreateOficialDTO, IOficialRepository } from "../../repositories/IOficialRepository";
import { insert } from "../../../../services/photos";
import fs from 'fs'
class CreateOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): void {
        const image = fs.readFileSync(file.path, {encoding: 'base64'})
        //insert(image, ro)

    }

    execute(oficial: ICreateOficialDTO): void {
        const {ro} = oficial
        const oficialAlreadyExist = this.oficiaisRepository.findByRO(ro)

        if(!oficialAlreadyExist){
            this.uploadImage(oficial.foto, ro)
           // this.oficiaisRepository.create(oficial)
        }
        
    }
}

export {CreateOficialUseCase}