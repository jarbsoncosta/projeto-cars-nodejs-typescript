import {  Router } from 'express';
import multer from 'multer'

import CreateCategoryController from '../modules/cars/useCases/createCategory/CreateCategoryController'

import ListCategoriesController from '../modules/cars/useCases/listCategories/ListCategoriesController';
import ImportCategoryController from '../modules/cars/useCases/importCategory/ImportCategoryController'

const categoriesRoutes = Router();
const upload = multer({
    dest: "./tmp",
})

const listCategoriesController = new ListCategoriesController()
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController()


categoriesRoutes.post('/', createCategoryController.handle ) 

categoriesRoutes.get('/',  listCategoriesController.handle )

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

export default categoriesRoutes;

