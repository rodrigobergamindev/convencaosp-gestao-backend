import {Request, Response} from 'express'
import { ListPastoresUseCase } from './ListPastoresUseCase'


class ListPastoresController {
    constructor(private listPastoresUseCase: ListPastoresUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {
        
        try {
            const all = await this.listPastoresUseCase.execute()

            return response.status(200).json(all)
            
        } catch (error) {
            if(error){
                response.status(400).send(error.message)
            }
        }
    }
}

export {ListPastoresController}