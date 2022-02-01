import { Router } from 'express'
import multer from 'multer'
import { importOficialController } from '../modules/oficiais/useCases/importOficial'
import { listOficiaisController } from '../modules/oficiais/useCases/listOficiais'
import {deleteOficialController} from '../modules/oficiais/useCases/deleteOficial'
import { createOficialController } from '../modules/oficiais/useCases/createOficial'

const oficiaisRoutes = Router()

const upload = multer({
    dest: "./tmp",
})

const uploadImage = multer({
    dest: "./tmp/img"
})


oficiaisRoutes.post("/create", uploadImage.single("foto"), (request, response) => {
    return createOficialController.handle(request, response);
})

oficiaisRoutes.post("/import", upload.single("file"), (request, response) => {
   return importOficialController.handle(request, response)
})

oficiaisRoutes.get("/list", (request, response) => {
    return listOficiaisController.handle(request, response);
})

oficiaisRoutes.delete("/delete/:ro", (request, response) => {
    return deleteOficialController.handle(request, response);
})


export { oficiaisRoutes }