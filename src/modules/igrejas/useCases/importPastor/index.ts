import { IgrejaRepository } from "../../repositories/implementations/IgrejaRepository";
import { ImportIgrejaController } from "./ImportIgrejaController";
import { ImportIgrejaUseCase } from "./ImportIgrejaUseCase";


const igrejasRepository = IgrejaRepository.getInstance()
const importIgrejaUseCase = new ImportIgrejaUseCase(igrejasRepository)
const importIgrejaController = new ImportIgrejaController(importIgrejaUseCase)

export {importIgrejaController}