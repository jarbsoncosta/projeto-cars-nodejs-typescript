import Category from '../../cars/models/Category';
import { ICategoriesRepository } from '../../cars/repositories/ICategoriesRepository';

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}
    execute(): Category[] {
        const categories = this.categoriesRepository.list();
        return categories;
    }
}
export default ListCategoriesUseCase;
