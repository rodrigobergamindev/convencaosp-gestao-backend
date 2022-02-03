import { IgrejaRepository } from "../../repositories/implementations/IgrejaRepository";
import { DeleteIgrejaController } from "./DeleteIgrejaController";
import { DeleteIgrejaUseCase } from "./DeleteIgrejaUseCase";


const igrejasRepository = IgrejaRepository.getInstance()
const deleteIgrejaUseCase = new DeleteIgrejaUseCase(igrejasRepository)
const deleteIgrejaController = new DeleteIgrejaController(deleteIgrejaUseCase)

export {deleteIgrejaController}