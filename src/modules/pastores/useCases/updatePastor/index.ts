import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { UpdatePastorController } from "./UpdatePastorController";
import { UpdatePastorUseCase } from "./UpdatePastorUseCase";


const pastoresRepository = PastorRepository.getInstance()
const updatePastorUseCase = new UpdatePastorUseCase(pastoresRepository)
const updatePastorController = new UpdatePastorController(updatePastorUseCase)

export {updatePastorController}