import {Request, Response} from 'express'
import { ImportOficialUseCase } from './ImportOficialUseCase'


class ImportOficialController {
    constructor(private importOficialUseCase: ImportOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const {file} = request
        this.importOficialUseCase.execute(file)

        return response.send()
    }
}

export {ImportOficialController}