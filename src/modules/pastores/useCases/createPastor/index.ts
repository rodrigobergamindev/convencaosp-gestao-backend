import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { CreatePastorController } from "./CreatePastorController";
import { CreatePastorUseCase } from "./CreatePastorUseCase";


const oficiaisRepository = PastorRepository.getInstance()
const createPastorUseCase = new CreatePastorUseCase(oficiaisRepository)
const createPastorController = new CreatePastorController(createPastorUseCase)

export {createPastorController}