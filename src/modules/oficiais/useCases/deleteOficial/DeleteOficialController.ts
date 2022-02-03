import {Request, Response} from 'express'
import { DeleteOficialUseCase } from './DeleteOficialUseCase'


class DeleteOficialController {
    constructor(private deleteOficialUseCase: DeleteOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const {id} = request.params
        
        this.deleteOficialUseCase.execute(id)

        return response.send()
    }
}

export {DeleteOficialController}