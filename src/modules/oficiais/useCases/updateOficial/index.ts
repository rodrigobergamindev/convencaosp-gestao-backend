import { OficialRepository } from "../../repositories/implementations/OficialRepository";
import { UpdateOficialController } from "./UpdateOficialController";
import { UpdateOficialUseCase } from "./UpdateOficialUseCase";


const oficiaisRepository = OficialRepository.getInstance()
const updateOficialUseCase = new UpdateOficialUseCase(oficiaisRepository)
const updateOficialController = new UpdateOficialController(updateOficialUseCase)

export {updateOficialController}