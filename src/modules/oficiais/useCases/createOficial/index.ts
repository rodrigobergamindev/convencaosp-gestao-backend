import { OficialRepository } from "../../repositories/implementations/OficialRepository";
import { CreateOficialController } from "./CreateOficialController";
import { CreateOficialUseCase } from "./CreateOficialUseCase";


const oficiaisRepository = OficialRepository.getInstance()
const createOficialUseCase = new CreateOficialUseCase(oficiaisRepository)
const createOficialController = new CreateOficialController(createOficialUseCase)

export {createOficialController}