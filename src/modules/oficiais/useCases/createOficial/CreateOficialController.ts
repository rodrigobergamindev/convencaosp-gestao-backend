import {Request, Response} from 'express'
import { CreateOficialUseCase } from './CreateOficialUseCase'
import { db } from '../../../../services/firestore'



class CreateOficialController {
    constructor(private createOficialUseCase: CreateOficialUseCase) {

    }


    handle(request: Request, response: Response) : Response {
        const endereco = JSON.parse(request.body.endereco)
        const contato = JSON.parse(request.body.contato)
        const observacao = JSON.parse(request.body.observacao)
        const anuidade = JSON.parse(request.body.anuidade)

        if(request.file){
            const oficial = {...request.body,
                endereco,
                contato,
                observacao,
                anuidade,
                foto: request.file,
            }

            //implementar firesotre db const docRef = db.collection
            
            //this.createOficialUseCase.execute(oficial)



            return response.send()
        }

            const oficial = {...request.body,
                endereco,
                contato,
                observacao,
                anuidade,
            }

            this.createOficialUseCase.execute(oficial)

            return response.send()
        
    }
}

export {CreateOficialController}