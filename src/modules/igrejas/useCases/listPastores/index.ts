import { PastorRepository } from "../../repositories/implementations/PastorRepository";
import { ListPastoresController } from "./ListPastoresController";
import { ListPastoresUseCase } from "./ListPastoresUseCase";

const pastoresRepository = PastorRepository.getInstance()

const listPastorUseCase = new ListPastoresUseCase(pastoresRepository)

const listPastoresController = new ListPastoresController(listPastorUseCase)

export {listPastoresController}