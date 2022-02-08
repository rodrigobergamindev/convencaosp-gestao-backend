import {Request, Response} from 'express'
import { FindByRMUseCase } from './FindByRMUseCase'


class FindByRMController {
    constructor(private findByRMUseCase: FindByRMUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {
        const {rm} = request.params
        try {
            const oficial = await this.findByRMUseCase.execute(rm)

            return response.status(200).json(oficial)
            
        } catch (error) {
            if(error){
                response.status(400).send(error.message)
            }
        }
        

    }
}

export {FindByRMController}