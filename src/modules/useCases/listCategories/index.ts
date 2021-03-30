import CategoriesRepository from '../../cars/repositories/implementations/CategoriesRepository';
import ListCategoryController from './ListCategoriesController';
import ListCategoryUseCase from './ListCategoriesUseCase';

const categoriesRepository = null

const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoryController = new ListCategoryController(listCategoryUseCase);

export default listCategoryController;
