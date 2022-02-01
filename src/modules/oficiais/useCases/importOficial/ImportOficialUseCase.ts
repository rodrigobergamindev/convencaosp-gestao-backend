import fs from "fs";
import {parse} from "csv-parse"
import { IOficialRepository } from "../../repositories/IOficialRepository";
import {IAnuidade} from '../../../../types/IAnuidade'


interface IImportOficial {

    ro: string;
    funcao: string;
    nome: string;
    dirigente: string;
    endereco: string; 
    bairro: string;
    cidade: string;
    uf: string;
    cep: string; 
    telefone: string;
    email: string;
    rg: string;
    cpf: string;
    nascimento: Date;
    consagracao: Date; 
    ri_igreja: string; 
    anuidade: IAnuidade;
    observacao: string;

}

class ImportOficialUseCase {

    constructor(private oficiaisRepository : IOficialRepository) {

    }

    loadOficiais(file: Express.Multer.File): Promise<IImportOficial[]> {

        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
        const oficiais: IImportOficial[] = []

        const parseFile = parse()

        stream.pipe(parseFile)

        parseFile.on("data", async(line) => {
            //[*name*,*description*]
            const [
                ro, funcao, nome, dirigente, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, ri_igreja, 
                valor_credencial, pagamento_2016, tipo_2016, pagamento_2017, 
                tipo_2017, pagamento_2018, tipo_2018, pagamento_2019, tipo_2019, 
                pagamento_2020, tipo_2020, pagamento_2021, tipo_2021, data_de_envio, 
                observacao
               ] = line

               oficiais.push({
                ro, funcao, nome, dirigente, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, ri_igreja,
                anuidade: {
                    valor_credencial, pagamento_2016, tipo_2016, pagamento_2017, 
                    tipo_2017, pagamento_2018, tipo_2018, pagamento_2019, tipo_2019, 
                    pagamento_2020, tipo_2020, pagamento_2021, tipo_2021, data_de_envio
                }, 
                observacao
               })
        })
        .on("end", () => {
            resolve(oficiais)
        })
        .on("error", (err) => {
            reject(err)
        })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const oficiais = await this.loadOficiais(file)
        console.log(oficiais);

        oficiais.map(async (oficial) => {
            const {ro, funcao, nome, dirigente, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, ri_igreja,
                anuidade, 
                observacao} = oficial

            const existOficial = this.oficiaisRepository.findByRO(ro);

            if(!existOficial) {
                this.oficiaisRepository.create({
                ro, funcao, nome, dirigente, endereco, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, ri_igreja,
                anuidade, 
                observacao
                })
            }
        })
    }

}

export {ImportOficialUseCase}