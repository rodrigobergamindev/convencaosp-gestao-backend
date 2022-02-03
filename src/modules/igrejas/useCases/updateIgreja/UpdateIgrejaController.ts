import {Request, Response} from 'express'
import { UpdateIgrejaUseCase } from './UpdateIgrejaUseCase'



class UpdateIgrejaController {
    constructor(private updateIgrejaUseCase: UpdateIgrejaUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const igreja = {...request.body}
        this.updateIgrejaUseCase.execute(igreja)
        
        return response.send()
    }
}

export {UpdateIgrejaController}