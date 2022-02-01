import { Router } from 'express'
import multer from 'multer'
import { importOficialController } from '../modules/oficiais/useCases/importOficial'

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
    //return listCategoriesController.handle(request, response);
})


export { oficiaisRoutes }