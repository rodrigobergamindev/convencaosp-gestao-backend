import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { CreatePastorController } from "./CreatePastorController";
import { CreatePastorUseCase } from "./CreatePastorUseCase";


const pastoresRepository = PastorRepository.getInstance()
const createPastorUseCase = new CreatePastorUseCase(pastoresRepository)
const createPastorController = new CreatePastorController(createPastorUseCase)

export {createPastorController}