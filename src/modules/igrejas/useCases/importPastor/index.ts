import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { ImportPastorController } from "./ImportPastorController";
import { ImportPastorUseCase } from "./ImportPastorUseCase";


const pastoresRepository = PastorRepository.getInstance()
const importPastorUseCase = new ImportPastorUseCase(pastoresRepository)
const importPastorController = new ImportPastorController(importPastorUseCase)

export {importPastorController}