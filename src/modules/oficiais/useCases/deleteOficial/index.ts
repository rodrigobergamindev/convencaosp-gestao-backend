import { OficialRepository } from "../../repositories/implementations/OficialRepository";
import { DeleteOficialController } from "./DeleteOficialController";
import { DeleteOficialUseCase } from "./DeleteOficialUseCase";


const oficiaisRepository = OficialRepository.getInstance()
const deleteOficialUseCase = new DeleteOficialUseCase(oficiaisRepository)
const deleteOficialController = new DeleteOficialController(deleteOficialUseCase)

export {deleteOficialController}