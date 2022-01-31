import { Router } from 'express'
import multer from 'multer'
import {importOficiais} from '../modules/oficiais/useCases/importOficiais/index'

const oficiaisRoutes = Router()

const upload = multer({
    dest: "./tmp"
})

oficiaisRoutes.post("/", (request, response) => {
    //return createCategoryController.handle(request, response);
})

oficiaisRoutes.post("/import", upload.single("file"), (request, response) => {
   return importOficiais(request, response)
})



oficiaisRoutes.get("/", (request, response) => {
    //return listCategoriesController.handle(request, response);
})


export { oficiaisRoutes }