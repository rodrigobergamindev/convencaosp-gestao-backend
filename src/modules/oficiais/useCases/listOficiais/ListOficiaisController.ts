import {Request, Response} from 'express'
import { ListOficialUseCase } from './ListOficiaisUseCase'


class ListOficialController {
    constructor(private listOficialUseCase: ListOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const all = this.listOficialUseCase.execute()

        return response.json(all)
    }
}

export {ListOficialController}