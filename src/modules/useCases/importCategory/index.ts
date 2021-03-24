import CategoriesRepository from "../../cars/repositories/implementations/CategoriesRepository";
import ImportCategoryController from "./ImportCategoryController";
import ImportCategoryUseCase from "./ImportCategoryUseCase";


const categoriesRepository =  CategoriesRepository.getIstance()
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository) 

const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export default importCategoryController