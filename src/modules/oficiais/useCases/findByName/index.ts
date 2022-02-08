import { OficialRepository } from "../../repositories/implementations/OficialRepository";
import { FindByNameController } from './FindByNameController'
import { FindByNameUseCase } from "./FindByNameUseCase";

const oficiaisRepository = OficialRepository.getInstance()

const findByNameUseCase = new FindByNameUseCase(oficiaisRepository)

const findByNameController = new FindByNameController(findByNameUseCase)

export {findByNameController}