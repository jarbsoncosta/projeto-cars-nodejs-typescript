import csvParse from 'csv-parse'
import fs from 'fs' //modulo nativo do node
import { ICategoriesRepository } from '../../cars/repositories/ICategoriesRepository';

interface IImportCategory{
    name: string;
    description:string
}

class ImportCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository) { }
    
        loadCategory(file: Express.Multer.File):Promise<IImportCategory[]> {
            return new Promise((resolve, reject)=>{
                      //criando um stream de leitura passando o path(caminho)
        const stream = fs.createReadStream(file.path);
        const categories:IImportCategory[]=[]
        
        const parseFile = csvParse();
        //função pipe pega o pedaço lido e manda para o parseFile
        stream.pipe(parseFile)

        parseFile.on("data", async (line) => {
            const [name, description] = line
            
            categories.push({
                name,
                description
            })
                      
        })
            .on("end", () => {
                    resolve(categories)
            })
            .on("error", (err) => {
                reject(err)
            })    
                            
            })  
              
        
    }
async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategory(file)

    categories.map(async categories => {
        const { name, description } = categories
        
        const exists =  this.categoriesRepository.findByName(name);

        if (!exists) {
            this.categoriesRepository.create({
                name,
                description
            })
        }

     })

        
   
    }
}

export default ImportCategoryUseCase