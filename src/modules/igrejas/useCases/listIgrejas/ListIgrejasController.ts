import {Request, Response} from 'express'
import { ListIgrejasUseCase } from './ListIgrejasUseCase'


class ListIgrejasController {
    constructor(private listIgrejasUseCase: ListIgrejasUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const all = this.listIgrejasUseCase.execute()

        return response.json(all)
    }
}

export {ListIgrejasController}