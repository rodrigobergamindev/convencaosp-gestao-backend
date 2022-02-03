import {Request, Response} from 'express'
import { DeleteIgrejaUseCase } from './DeleteIgrejaUseCase'


class DeleteIgrejaController {
    constructor(private deleteIgrejaUseCase: DeleteIgrejaUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const {id} = request.params
        
        this.deleteIgrejaUseCase.execute(id)

        return response.send()
    }
}

export {DeleteIgrejaController}