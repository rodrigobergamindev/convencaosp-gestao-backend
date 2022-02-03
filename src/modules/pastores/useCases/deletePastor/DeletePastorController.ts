import {Request, Response} from 'express'
import { DeletePastorUseCase } from './DeletePastorUseCase'


class DeletePastorController {
    constructor(private deletePastorUseCase: DeletePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const {id} = request.params
        
        this.deletePastorUseCase.execute(id)

        return response.send()
    }
}

export {DeletePastorController}