import {Request, Response} from 'express'
import { CreateOficialUseCase } from './CreateOficialUseCase'


class CreateOficialController {
    constructor(private createOficialUseCase: CreateOficialUseCase) {

    }

    handle(request: Request, response: Response) : Response {

        const oficial = {...request.body, foto: request.file.filename}
        this.createOficialUseCase.execute(oficial)

        return response.send()
    }
}

export {CreateOficialController}