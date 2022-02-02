import {Request, Response} from 'express'
import { DeletePastorUseCase } from './DeletePastorUseCase'


class DeletePastorController {
    constructor(private deletePastorUseCase: DeletePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const {ro} = request.params
        
        this.deletePastorUseCase.execute(ro)

        return response.send()
    }
}

export {DeletePastorController}