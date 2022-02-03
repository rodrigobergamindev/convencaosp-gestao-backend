import fs from "fs";
import {parse} from "csv-parse"
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";
import {IAnuidade} from '../../../../types/IAnuidade'


interface IImportIgreja {

    rm: string;
    titulo: string;
    nome: string;
    funcao?: string;
    status?: string;
    endereco: string; 
    bairro: string;
    cidade: string;
    uf: string;
    cep: string; 
    telefone?: string;
    email?: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    consagracao?: Date; 
    igreja_sede: string; 
    credencial: Date;
    observacao?: string;

}

class ImportIgrejaUseCase {

    constructor(private igrejasRepository : IIgrejaRepository) {

    }

    loadIgrejas(file: Express.Multer.File): Promise<IImportIgreja[]> {

        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
        const igrejas: IImportIgreja[] = []

        const parseFile = parse()

        stream.pipe(parseFile)

        parseFile.on("data", async(line) => {
            //[*name*,*description*]
            const [
                rm, titulo, nome, funcao, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                nascimento, consagracao, rg, cpf, igreja_sede, credencial, observacao
               ] = line

               igrejas.push({
                rm, titulo, nome, funcao, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                nascimento, consagracao, rg, cpf, igreja_sede, credencial, observacao
               })
        })
        .on("end", async () => {
            resolve(igrejas)

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
        const igrejas = await this.loadIgrejas(file)

        igrejas.map(async (pastor) => {
            
            const {rm, titulo, nome, funcao, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, igreja_sede,
                credencial, 
                observacao} = pastor

            const existPastor = this.igrejasRepository.findByRI(ri);

            if(!existPastor) {
                
               this.igrejasRepository.create({
                rm, titulo, nome, funcao, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, igreja_sede,
                credencial, 
                observacao
                })
                
            }

        })
    }

}

export {ImportIgrejaUseCase}