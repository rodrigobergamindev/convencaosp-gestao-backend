import {Request, Response} from 'express'
import { DeleteOficialUseCase } from './DeleteOficialUseCase'


class DeleteOficialController {
    constructor(private deleteOficialUseCase: DeleteOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const {ro} = request.params
        
        this.deleteOficialUseCase.execute(ro)

        return response.send()
    }
}

export {DeleteOficialController}