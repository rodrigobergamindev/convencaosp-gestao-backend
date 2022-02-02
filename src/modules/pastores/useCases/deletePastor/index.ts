import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { DeletePastorController } from "./DeletePastorController";
import { DeletePastorUseCase } from "./DeletePastorUseCase";


const pastoresRepository = PastorRepository.getInstance()
const deletePastorUseCase = new DeletePastorUseCase(pastoresRepository)
const deletePastorController = new DeletePastorController(deletePastorUseCase)

export {deletePastorController}