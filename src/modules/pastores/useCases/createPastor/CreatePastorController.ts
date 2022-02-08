import {Request, Response} from 'express'
import { CreatePastorUseCase } from './CreatePastorUseCase'



class CreatePastorController {
    constructor(private createPastorUseCase: CreatePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = JSON.parse(request.body.observacao)


        try {

            if(request.file){

                const pastor = {...request.body,
                    endereco,
                    contato,
                    observacao,
                    foto: request.file,
                }
                this.createPastorUseCase.execute(pastor)
        
                return response.status(201).send()
        
               }
        
                const pastor = {...request.body,
                    endereco,
                    contato,
                    observacao,
                }
                this.createPastorUseCase.execute(pastor)
        
                return response.status(201).send()
            
        } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
        }

    }
}

export {CreatePastorController}