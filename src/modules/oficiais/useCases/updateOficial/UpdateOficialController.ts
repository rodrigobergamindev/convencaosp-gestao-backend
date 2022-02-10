import {Request, Response} from 'express'
import { UpdateOficialUseCase } from './UpdateOficialUseCase'



class UpdateOficialController {
    constructor(private updateOficialUseCase: UpdateOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = request.body.observacao? JSON.parse(request.body.observacao) : null
        const anuidade = JSON.parse(request.body.anuidade)
        const foto = request.file? request.file : null

        try {
                const oficial = {...request.body,
                    anuidade,
                    contato,
                    observacao,
                    endereco,
                    foto
                }
                
                this.updateOficialUseCase.execute(oficial)
    
                return response.status(201).send()
            
        } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
            
        }
        
    }
}

export {UpdateOficialController}