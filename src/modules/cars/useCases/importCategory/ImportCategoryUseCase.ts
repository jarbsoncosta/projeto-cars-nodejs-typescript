import csvParse from 'csv-parse';
import fs from 'fs'; // modulo nativo do node
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}
@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
    ) {}

    loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            // criando um stream de leitura passando o path(caminho)
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = csvParse();
            // função pipe pega o pedaço lido e manda para o parseFile
            stream.pipe(parseFile);

            parseFile
                .on('data', async line => {
                    const [name, description] = line;

                    categories.push({
                        name,
                        description,
                    });
                })
                .on('end', () => {
                    fs.promises.unlink(file.path); // remover o arquivo importado após o cadastro
                    resolve(categories);
                })
                .on('error', err => {
                    reject(err);
                });
        });
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategory(file);

        categories.map(async categories => {
            const { name, description } = categories;

            const exists = await this.categoriesRepository.findByName(name);

            if (!exists) {
                await this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export default ImportCategoryUseCase;
