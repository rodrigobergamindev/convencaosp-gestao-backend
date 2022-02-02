
import { ICreateOficialDTO, IOficialRepository } from "../../repositories/IOficialRepository";
import { insert } from "../../../../services/photos";
import fs from 'fs'
class CreateOficialUseCase {

    constructor(private oficiaisRepository: IOficialRepository){

    }

    uploadImage(file: Express.Multer.File, ro: string): void {
        insert(file, ro)
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