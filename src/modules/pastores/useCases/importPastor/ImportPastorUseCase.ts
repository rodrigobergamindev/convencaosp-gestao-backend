import fs from "fs";
import {parse} from "csv-parse"
import { IPastorRepository, IEndereco, IObservacao, IContato } from "../../repositories/IPastorRepository";



interface IImportPastor {

    rm: string;
    titulo: string;
    nome: string;
    funcao: string;
    status: string;
    endereco: IEndereco[];
    contato: IContato[];
    rg: string;
    cpf: string;
    nascimento: string;
    consagracao: string; 
    igreja_sede: string; 
    credencial: string;
    observacao: IObservacao[];

}

class ImportPastorUseCase {

    constructor(private pastoresRepository : IPastorRepository) {

    }

    loadPastores(file: Express.Multer.File): Promise<IImportPastor[]> {

        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
        const pastores: IImportPastor[] = []

        const parseFile = parse()

        stream.pipe(parseFile)

        parseFile.on("data", async(line) => {
            //[*name*,*description*]
            const [
                rm, titulo, nome, funcao, logradouro, 
                bairro, cidade, uf, cep, telefone, email, 
                nascimento, consagracao, rg, cpf, igreja_sede, credencial, descricao
               ] = line

               pastores.push({
                rm, titulo, nome, funcao,
                status: 'ativo',
                endereco: [
                    {
                    logradouro,
                    bairro,
                    cidade,
                    uf,
                    cep
                }
            ],
                contato: [
                    {
                        tipo: 'importado',
                        descricao: telefone,
                    },
                    {
                        tipo: 'email',
                        descricao: email,
                    }
                ],
                nascimento, consagracao, rg, cpf, igreja_sede, credencial, 
                observacao : [
                    {
                        titulo: null,
                        descricao
                    }
                ] 
               })
        })
        .on("end", async () => {
            resolve(pastores)

            await fs.unlink(`${file.path}`, (err) => {
                if (err) throw err
                console.log(`${file.path} was deleted`);
            })
        })
        .on("error", (err) => {
            reject(err)
        })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const pastores = await this.loadPastores(file)

        pastores.map(async (pastor) => {
            const {rm} = pastor
            const existPastor = this.pastoresRepository.findByRM(rm);

            if(!existPastor) {
                
               this.pastoresRepository.create(pastor)
                
            }

        })
    }

}

export {ImportPastorUseCase}