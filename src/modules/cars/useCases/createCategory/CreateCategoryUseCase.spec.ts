import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCategoryUseCase from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let createRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
    beforeEach(() => {
        createRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            createRepositoryInMemory,
        );
    });

    // deve ser capaz de criar uma nova categoria
    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category description Test',
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
        const categoryCreated = await createRepositoryInMemory.findByName(
            category.name,
        );
        expect(categoryCreated).toHaveProperty('id');
    });
    // não deve ser capaz de criar uma nova categoria com o nome existente
    it('shoutd not be able to create a new category with name exists', async () => {
        expect(async () => {
            const category = {
                name: 'Category Test',
                description: 'Category description Test',
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
