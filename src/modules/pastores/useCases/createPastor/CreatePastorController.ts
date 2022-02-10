import {Request, Response} from 'express'
import { CreatePastorUseCase } from './CreatePastorUseCase'



class CreatePastorController {
    constructor(private createPastorUseCase: CreatePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = request.body.observacao? JSON.parse(request.body.observacao) : null
        const foto = request.file? request.file : null

        try {

                const pastor = {...request.body,
                    endereco,
                    contato,
                    observacao,
                    foto
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