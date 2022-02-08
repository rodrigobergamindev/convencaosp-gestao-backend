import {Request, Response} from 'express'
import { FindByNameUseCase } from './FindByNameUseCase'


class FindByNameController {
    constructor(private findByNameUseCase: FindByNameUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {
        const {nome} = request.body
        console.log(request.body);
        try {
            
            const all = await this.findByNameUseCase.execute(nome)

            return response.status(200).json(all)
            
        } catch (error) {
            if(error){
                response.status(400).send(error.message)
            }
        }
        

    }
}

export {FindByNameController}