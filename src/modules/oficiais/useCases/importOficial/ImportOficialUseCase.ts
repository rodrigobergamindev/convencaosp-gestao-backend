import fs from "fs";
import {parse} from "csv-parse"
import { IOficialRepository } from "../../repositories/IOficialRepository";
import {IAnuidade, IEndereco, IContato, IObservacao} from '../../model/Oficial'
import {db} from '../../../../services/firestore'

interface IImportOficial {

    ro: string;
    titulo: string;
    nome: string;
    funcao?: string;
    status?: string;
    endereco?: IEndereco[];
    contato?: IContato[];
    rg: string;
    cpf: string;
    nascimento: string;
    consagracao?: string; 
    igreja_sede: string; 
    anuidade?: IAnuidade;
    observacao?: IObservacao[];

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
                ro, titulo, nome, funcao, logradouro, 
                bairro, cidade, uf, cep, telefone, email, 
                rg, cpf, nascimento, consagracao, igreja_sede, 
                valor_credencial, pagamento_2016, tipo_2016, pagamento_2017, 
                tipo_2017, pagamento_2018, tipo_2018, pagamento_2019, tipo_2019, 
                pagamento_2020, tipo_2020, pagamento_2021, tipo_2021, data_de_envio, 
                descricao
               ] = line

               oficiais.push({
                ro, titulo, nome, funcao, endereco: [
                    {
                    logradouro,
                    bairro,
                    cep,
                    cidade,
                    uf
                }
            ], 
                contato: [
                    {
                        tipo: 'importado',
                        descricao: telefone 
                    },
                    {
                        tipo: 'e-mail',
                        descricao: email 
                    }
            ], 
                rg, cpf, nascimento, consagracao, igreja_sede,
                anuidade: 
                    {
                        valor_credencial,
                        envio: data_de_envio,
                        pagamentos: [
                            {
                                data: pagamento_2016,
                                tipo: tipo_2016
                            },

                            {
                                data: pagamento_2017,
                                tipo: tipo_2017
                            },

                            {
                                data: pagamento_2018,
                                tipo: tipo_2018
                            },

                            {
                                data:pagamento_2019,
                                tipo: tipo_2019
                            },

                            {
                                data: pagamento_2020,
                                tipo: tipo_2020
                            },
                            {
                                data: pagamento_2021,
                                tipo: tipo_2021
                            }
                        ]
                    }
                , 
                observacao: [
                    {
                    titulo: null,
                    descricao
                    }
                ]
               })
        })
        .on("end", async () => {
            resolve(oficiais)

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
        const oficiais = await this.loadOficiais(file)

        oficiais.map(async (oficial) => {
          

               this.oficiaisRepository.create(oficial)
                
            

        })
    }

}

export {ImportOficialUseCase}