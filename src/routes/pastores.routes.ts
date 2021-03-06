import { Router } from 'express'
import multer from 'multer'
import { importPastorController } from '../modules/pastores/useCases/importPastor'
import { listPastoresController } from '../modules/pastores/useCases/listPastores'
import {deletePastorController} from '../modules/pastores/useCases/deletePastor'
import { createPastorController } from '../modules/pastores/useCases/createPastor'
import {updatePastorController} from '../modules/pastores/useCases/updatePastor'
import { findByRMController } from '../modules/pastores/useCases/findByRM'

const pastoresRoutes = Router()

const upload = multer({
    dest: "./tmp",
})

const uploadImage = multer({
    storage: multer.memoryStorage()
})


pastoresRoutes.post("/create", uploadImage.single("foto"), (request, response) => {
    console.log(request.body)
    //return createPastorController.handle(request, response);
})

pastoresRoutes.put("/update", uploadImage.single("foto"), (request, response) => {
    return updatePastorController.handle(request, response);
})

pastoresRoutes.post("/import", upload.single("file"), (request, response) => {
   return importPastorController.handle(request, response)
})

pastoresRoutes.get("/list", (request, response) => {
    return listPastoresController.handle(request, response);
})

pastoresRoutes.get("/:rm", (request, response) => {
    return findByRMController.handle(request, response);
})

pastoresRoutes.delete("/delete/:rm", (request, response) => {
    return deletePastorController.handle(request, response);
})


export { pastoresRoutes }