import {Request, Response} from 'express'
import { CreatePastorUseCase } from './CreatePastorUseCase'



class CreatePastorController {
    constructor(private createPastorUseCase: CreatePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const pastor = {...request.body, foto: request.file}
        this.createPastorUseCase.execute(pastor)

        return response.send()
    }
}

export {CreatePastorController}