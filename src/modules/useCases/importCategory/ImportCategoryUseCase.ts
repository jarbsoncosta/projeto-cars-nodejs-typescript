import csvParse from 'csv-parse'
import fs from 'fs' //modulo nativo do node


class ImportCategoryUseCase{
    execute(file:Express.Multer.File): void {
        //criando um stream de leitura passando o path(caminho)
        const stream = fs.createReadStream(file.path);
        
        const parseFile = csvParse();
        //função pipe pega o pedaço lido e manda para o parseFile
        stream.pipe(parseFile)

        parseFile.on("data", async (line) => {
            console.log(line)
        });
    }
}

export default ImportCategoryUseCase