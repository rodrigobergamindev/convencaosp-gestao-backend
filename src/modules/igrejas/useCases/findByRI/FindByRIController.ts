import {Request, Response} from 'express'
import { FindByRIUseCase } from './FindByRIUseCase'


class FindByRIController {
    constructor(private findByRIUseCase: FindByRIUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {
        const {ri} = request.params
        try {
            const igreja = await this.findByRIUseCase.execute(ri)

            return response.status(200).json(igreja)
            
        } catch (error) {
            if(error){
                response.status(400).send(error.message)
            }
        }
        

    }
}

export {FindByRIController}