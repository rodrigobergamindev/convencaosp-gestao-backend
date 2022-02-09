import {Request, Response} from 'express'
import { DeletePastorUseCase } from './DeletePastorUseCase'


class DeletePastorController {
    constructor(private deletePastorUseCase: DeletePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        const {rm} = request.params

        try {
            this.deletePastorUseCase.execute(rm)

            return response.status(200).send()

        } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
        }
    }
}

export {DeletePastorController}