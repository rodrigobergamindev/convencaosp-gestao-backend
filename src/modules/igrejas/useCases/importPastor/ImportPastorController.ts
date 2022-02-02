import {Request, Response} from 'express'
import { ImportPastorUseCase } from './ImportPastorUseCase'


class ImportPastorController {
    constructor(private importPastorUseCase: ImportPastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const {file} = request
        this.importPastorUseCase.execute(file)

        return response.send()
    }
}

export {ImportPastorController}