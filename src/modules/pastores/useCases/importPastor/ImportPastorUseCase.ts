import fs from "fs";
import {parse} from "csv-parse"
import { IPastorRepository } from "../../repositories/IPastorRepository";
import {IAnuidade} from '../../../../types/IAnuidade'


interface IImportPastor {

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
                rm, titulo, nome, funcao, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, igreja_sede, 
                credencial,observacao
               ] = line

               pastores.push({
                rm, titulo, nome, funcao, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, igreja_sede,credencial
                , observacao
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
            
            const {rm, titulo, nome, funcao, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, igreja_sede,
                credencial, 
                observacao} = pastor

            const existPastor = this.pastoresRepository.findByRM(rm);

            if(!existPastor) {
                
               this.pastoresRepository.create({
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

export {ImportPastorUseCase}