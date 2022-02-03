import { Router } from 'express'
import { importIgrejaController } from '../modules/igrejas/useCases/importIgreja'
import { listIgrejasController } from '../modules/igrejas/useCases/listIgrejas'
import {deleteIgrejaController} from '../modules/igrejas/useCases/deleteIgreja'
import {createIgrejaController } from '../modules/igrejas/useCases/createIgreja'
import {updateIgrejaController} from '../modules/igrejas/useCases/updateIgreja'
import multer from 'multer'

const igrejasRoutes = Router()

const upload = multer({
    dest: "./tmp",
})

const uploadImage = multer({
    storage: multer.memoryStorage()
})


igrejasRoutes.post("/create", (request, response) => {
    return createIgrejaController.handle(request, response);
})

igrejasRoutes.put("/update", (request, response) => {
    return updateIgrejaController.handle(request, response);
})

igrejasRoutes.post("/import", upload.single("file"), (request, response) => {
   return importIgrejaController.handle(request, response)
})

igrejasRoutes.get("/list", (request, response) => {
    return listIgrejasController.handle(request, response);
})

igrejasRoutes.delete("/delete/:id", (request, response) => {
    return deleteIgrejaController.handle(request, response);
})


export { igrejasRoutes }