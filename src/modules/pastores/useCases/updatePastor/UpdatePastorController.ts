import {Request, Response} from 'express'
import { UpdatePastorUseCase } from './UpdatePastorUseCase'



class UpdatePastorController {
    constructor(private updatePastorUseCase: UpdatePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const pastor = {...request.body, foto: request.file}
        this.updatePastorUseCase.execute(pastor)
        
        return response.send()
    }
}

export {UpdatePastorController}