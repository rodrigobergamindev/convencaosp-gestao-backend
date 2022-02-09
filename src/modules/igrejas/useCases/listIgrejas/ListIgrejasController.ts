import {Request, Response} from 'express'
import { ListIgrejasUseCase } from './ListIgrejasUseCase'


class ListIgrejasController {
    constructor(private listIgrejasUseCase: ListIgrejasUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {
        
        try {
            const all = await this.listIgrejasUseCase.execute()

            return response.status(200).json(all)
            
        } catch (error) {
            if(error){
                response.status(400).send(error.message)
            }
        }
    }
}

export {ListIgrejasController}