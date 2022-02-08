import {Request, Response} from 'express'
import { UpdateOficialUseCase } from './UpdateOficialUseCase'



class UpdateOficialController {
    constructor(private updateOficialUseCase: UpdateOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = JSON.parse(request.body.observacao)
        const anuidade = JSON.parse(request.body.anuidade)

       try {
            if(request.file){
                const oficial = {...request.body,
                    endereco,
                    contato,
                    observacao,
                    anuidade,
                    foto: request.file,
                }
    
                this.updateOficialUseCase.execute(oficial)
    
                return response.status(201).send()
            }
    
                const oficial = {...request.body,
                    endereco,
                    contato,
                    observacao,
                    anuidade,
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