import {Request, Response} from 'express'
import { UpdateIgrejaUseCase } from './UpdateIgrejaUseCase'



class UpdateIgrejaController {
    constructor(private updateIgrejaUseCase: UpdateIgrejaUseCase) {

    }

    handle(request: Request, response: Response) : Response {
        
        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = JSON.parse(request.body.observacao)
        const superitendencia = JSON.parse(request.body.superintedencia)
        const contribuicoes = JSON.parse(request.body.contribuicoes)

       try {
                const igreja = {...request.body,
                    endereco,
                    contato,
                    observacao,
                    superitendencia,
                    contribuicoes
                }
    
                this.updateIgrejaUseCase.execute(igreja)
    
                return response.status(201).send()
            
       } catch (error) {
            if(error){
                return response.status(404).send(error)
            }
       }
        
    }
}

export {UpdateIgrejaController}