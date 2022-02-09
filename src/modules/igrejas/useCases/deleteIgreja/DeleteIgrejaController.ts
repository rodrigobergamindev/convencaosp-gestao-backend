import {Request, Response} from 'express'
import { DeleteIgrejaUseCase } from './DeleteIgrejaUseCase'


class DeleteIgrejaController {
    constructor(private deleteIgrejaUseCase: DeleteIgrejaUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {

        try {
            const {ri} = request.params
        
            this.deleteIgrejaUseCase.execute(ri)

            return response.status(200).send()

        } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
        }
    }
}

export {DeleteIgrejaController}