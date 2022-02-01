import { OficialRepository } from "../../repositories/implementations/OficialRepository";
import { ListOficialController } from "./ListOficiaisController";
import { ListOficialUseCase } from "./ListOficiaisUseCase";

const oficiaisRepository = OficialRepository.getInstance()

const listOficialUseCase = new ListOficialUseCase(oficiaisRepository)

const listOficiaisController = new ListOficialController(listOficialUseCase)

export {listOficiaisController}