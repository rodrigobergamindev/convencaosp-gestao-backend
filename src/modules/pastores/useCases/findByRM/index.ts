import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { FindByRMController } from './FindByRMController'
import { FindByRMUseCase } from "./FindByRMUseCase";

const pastoresRepository = PastorRepository.getInstance()

const findByRMUseCase = new FindByRMUseCase(pastoresRepository)

const findByRMController = new FindByRMController(findByRMUseCase)

export {findByRMController}