import { OficialRepository } from "../../repositories/implementations/OficialRepository";
import { FindByROController } from './FindByROController'
import { FindByROUseCase } from "./FindByROUseCase";

const oficiaisRepository = OficialRepository.getInstance()

const findByROUseCase = new FindByROUseCase(oficiaisRepository)

const findByROController = new FindByROController(findByROUseCase)

export {findByROController}