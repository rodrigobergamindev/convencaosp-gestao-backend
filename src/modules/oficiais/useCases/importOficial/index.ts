import { OficialRepository } from "../../repositories/implementations/OficialRepository";
import { ImportOficialController } from "./ImportOficialController";
import { ImportOficialUseCase } from "./ImportOficialUseCase";


const oficiaisRepository = OficialRepository.getInstance()
const importOficialUseCase = new ImportOficialUseCase(oficiaisRepository)
const importOficialController = new ImportOficialController(importOficialUseCase)

export {importOficialController}