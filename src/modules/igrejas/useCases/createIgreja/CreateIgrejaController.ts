import {Request, Response} from 'express'
import { CreateIgrejaUseCase } from './CreateIgrejaUseCase'



class CreateIgrejaController {
    constructor(private createIgrejaUseCase: CreateIgrejaUseCase) {

    }

    async handle(request: Request, response: Response) : Promise<Response> {

        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = request.body.observacao? JSON.parse(request.body.observacao) : null
        const superintendencia = JSON.parse(request.body.superintendencia)
        const contribuicoes = JSON.parse(request.body.contribuicoes)


        try {

                const igreja = {...request.body,
                    endereco,
                    contato,
                    observacao,
                    superintendencia,
                    contribuicoes
                }
    
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