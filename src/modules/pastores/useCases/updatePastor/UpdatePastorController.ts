import {Request, Response} from 'express'
import { UpdatePastorUseCase } from './UpdatePastorUseCase'



class UpdatePastorController {
    constructor(private updatePastorUseCase: UpdatePastorUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = JSON.parse(request.body.observacao)
        const foto = request.file? request.file : null
        
        try {
                const pastor = {...request.body,
                    endereco,
                    contato,
                    observacao,
                    foto
                }
                this.updatePastorUseCase.execute(pastor)
                
                return response.status(201).send()

            
        } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
        }

    
    }
}

export {UpdatePastorController}