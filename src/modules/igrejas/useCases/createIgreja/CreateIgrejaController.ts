import {Request, Response} from 'express'
import { CreateIgrejaUseCase } from './CreateIgrejaUseCase'



class CreateIgrejaController {
    constructor(private createIgrejaUseCase: CreateIgrejaUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const igreja = {...request.body, foto: request.file}
        this.createIgrejaUseCase.execute(igreja)

        return response.send()
    }
}

export {CreateIgrejaController}