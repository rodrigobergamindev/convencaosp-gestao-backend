import {Router} from 'express'
import {oficiaisRoutes} from './oficiais.routes'
import {igrejasRoutes} from './igrejas.routes'

const router = Router()

router.use("/oficiais", oficiaisRoutes)
router.use("/igrejas", igrejasRoutes)


export {router}