import { IgrejaRepository } from "../../repositories/implementations/IgrejaRepository";
import { FindByRIController } from './FindByRIController'
import { FindByRIUseCase } from "./FindByRIUseCase";

const igrejasRepository = IgrejaRepository.getInstance()

const findByRIUseCase = new FindByRIUseCase(igrejasRepository)

const findByRIController = new FindByRIController(findByRIUseCase)

export {findByRIController}