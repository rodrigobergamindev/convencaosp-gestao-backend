import { Router } from 'express'
import multer from 'multer'
import { importOficialController } from '../modules/oficiais/useCases/importOficial'
import { listOficiaisController } from '../modules/oficiais/useCases/listOficiais'
import {deleteOficialController} from '../modules/oficiais/useCases/deleteOficial'

const oficiaisRoutes = Router()

const upload = multer({
    dest: "./tmp"
})

oficiaisRoutes.post("/", (request, response) => {
    //return createCategoryController.handle(request, response);
})

oficiaisRoutes.post("/import", upload.single("file"), (request, response) => {
   return importOficialController.handle(request, response)
})

oficiaisRoutes.get("/", (request, response) => {
    return listOficiaisController.handle(request, response);
})

oficiaisRoutes.delete("/delete/:ro", (request, response) => {
    return deleteOficialController.handle(request, response);
})


export { oficiaisRoutes }