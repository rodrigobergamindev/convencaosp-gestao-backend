import {Request, Response} from 'express'
import { UpdateOficialUseCase } from './UpdateOficialUseCase'



class UpdateOficialController {
    constructor(private updateOficialUseCase: UpdateOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const oficial = {...request.body, foto: request.file}
        this.updateOficialUseCase.execute(oficial)
        
        return response.send()
    }
}

export {UpdateOficialController}