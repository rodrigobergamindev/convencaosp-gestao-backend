import {Request, Response} from 'express'
import { ImportIgrejaUseCase } from './ImportIgrejaUseCase'


class ImportIgrejaController {
    constructor(private importIgrejaUseCase: ImportIgrejaUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const {file} = request
        this.importIgrejaUseCase.execute(file)

        return response.send()
    }
}

export {ImportIgrejaController}