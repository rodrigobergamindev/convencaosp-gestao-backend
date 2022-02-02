import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { UpdatePastorController } from "./UpdatePastorController";
import { UpdatePastorUseCase } from "./UpdatePastorUseCase";


const oficiaisRepository = PastorRepository.getInstance()
const updatePastorUseCase = new UpdatePastorUseCase(oficiaisRepository)
const updatePastorController = new UpdatePastorController(updatePastorUseCase)

export {updatePastorController}