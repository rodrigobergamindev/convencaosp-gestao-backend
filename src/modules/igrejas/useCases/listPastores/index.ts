import { IgrejaRepository } from "../../repositories/implementations/IgrejaRepository";
import { ListIgrejasController } from "./ListIgrejasController";
import { ListIgrejasUseCase } from "./ListIgrejasUseCase";

const igrejasRepository = IgrejaRepository.getInstance()

const listIgrejaUseCase = new ListIgrejasUseCase(igrejasRepository)

const listIgrejasController = new ListIgrejasController(listIgrejaUseCase)

export {listIgrejasController}