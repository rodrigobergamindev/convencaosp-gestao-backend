import {Request, Response} from 'express'
import { ListOficialUseCase } from './ListOficiaisUseCase'


class ListOficialController {
    constructor(private listOficialUseCase: ListOficialUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {

        try {

            const all = await this.listOficialUseCase.execute()

            return response.status(200).json(all)
            
        } catch (error) {
            if(error){
                response.status(400).send(error.message)
            }
        }
        

    }
}

export {ListOficialController}