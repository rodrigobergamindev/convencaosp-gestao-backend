import {Request, Response} from 'express'
import { ListPastoresUseCase } from './ListPastoresUseCase'


class ListPastoresController {
    constructor(private listPastoresUseCase: ListPastoresUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const all = this.listPastoresUseCase.execute()

        return response.json(all)
    }
}

export {ListPastoresController}