import { IgrejaRepository } from "../../repositories/implementations/IgrejaRepository";
import { CreateIgrejaController } from "./CreateIgrejaController";
import { CreateIgrejaUseCase } from "./CreateIgrejaUseCase";


const igrejasRepository = IgrejaRepository.getInstance()
const createIgrejaUseCase = new CreateIgrejaUseCase(igrejasRepository)
const createIgrejaController = new CreateIgrejaController(createIgrejaUseCase)

export {createIgrejaController}