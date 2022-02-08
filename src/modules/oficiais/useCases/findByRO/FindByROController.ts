import {Request, Response} from 'express'
import { FindByROUseCase } from './FindByROUseCase'


class FindByROController {
    constructor(private findByROUseCase: FindByROUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {
        const {ro} = request.params
        try {
            const oficial = await this.findByROUseCase.execute(ro)

            return response.status(200).json(oficial)
            
        } catch (error) {
            if(error){
                response.status(400).send(error.message)
            }
        }
        

    }
}

export {FindByROController}