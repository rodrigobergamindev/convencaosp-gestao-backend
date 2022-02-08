import {Request, Response} from 'express'
import { DeleteOficialUseCase } from './DeleteOficialUseCase'


class DeleteOficialController {
    constructor(private deleteOficialUseCase: DeleteOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {


        try {
            const {ro} = request.params
        
            this.deleteOficialUseCase.execute(ro)

            return response.status(200).send()

        } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
        }
        
    }
}

export {DeleteOficialController}