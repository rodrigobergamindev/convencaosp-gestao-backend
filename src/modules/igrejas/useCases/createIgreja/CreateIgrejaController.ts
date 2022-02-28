import {Request, Response} from 'express'
import { CreateIgrejaUseCase } from './CreateIgrejaUseCase'



class CreateIgrejaController {
    constructor(private createIgrejaUseCase: CreateIgrejaUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {


        try {
                const igreja = {...request.body}              

                this.createIgrejaUseCase.execute(igreja)
    
                return response.status(201).send()
            
        } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
            
        }
    }
}

export {CreateIgrejaController}