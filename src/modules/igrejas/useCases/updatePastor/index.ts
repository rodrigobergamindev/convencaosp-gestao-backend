import { IgrejaRepository } from "../../repositories/implementations/IgrejaRepository";
import { UpdateIgrejaController } from "./UpdateIgrejaController";
import { UpdateIgrejaUseCase } from "./UpdateIgrejaUseCase";


const igrejasRepository = IgrejaRepository.getInstance()
const updateIgrejaUseCase = new UpdateIgrejaUseCase(igrejasRepository)
const updateIgrejaController = new UpdateIgrejaController(updateIgrejaUseCase)

export {updateIgrejaController}