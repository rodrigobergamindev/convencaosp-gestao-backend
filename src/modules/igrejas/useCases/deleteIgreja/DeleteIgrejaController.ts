import {Request, Response} from 'express'
import { DeleteIgrejaUseCase } from './DeleteIgrejaUseCase'


class DeleteIgrejaController {
    constructor(private deleteIgrejaUseCase: DeleteIgrejaUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const {ro} = request.params
        
        this.deleteIgrejaUseCase.execute(ro)

        return response.send()
    }
}

export {DeleteIgrejaController}