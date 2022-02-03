import fs from "fs";
import {parse} from "csv-parse"
import { IIgrejaRepository } from "../../repositories/IIgrejaRepository";
import {IEndereco, IContato, ISuperintendencia, IContribuicoes, IObservacao} from '../../model/Igreja'


interface IImportIgreja {

    ri: string;
    nome: string;
    cnpj: string;
    tipo: string;
    igreja_sede: string;
    endereco: IEndereco[];
    contato: IContato[];
    dirigente: string;
    presidente: string;
    templo: string;
    membros: string;
    superitendencia: ISuperintendencia;
    contribuicoes: IContribuicoes;
    observacao: IObservacao[];

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
                ri, nome, cnpj, tipo,
                igreja_sede, logradouro, bairro,
                cidade, uf, cep, numero_telefone, email,
                dirigente,presidente,templo,membros, nome_superintendencia, localizacao, regiao,
                logradouro_correspondencia, bairro_correspondencia, cidade_correspondencia, uf_correspondencia, cep_correspondencia,
                dd, pn, taxa, observacao_descricao
               ] = line

            igrejas.push({
                ri, nome, cnpj, tipo,
                igreja_sede,
                endereco: [
                    {
                        tipo: 'principal',
                        logradouro,
                        bairro,
                        cidade,
                        uf,
                        cep
                    },
                    {
                        tipo: 'correspondencia',
                        logradouro: logradouro_correspondencia,
                        bairro: bairro_correspondencia,
                        cidade: cidade_correspondencia,
                        uf: uf_correspondencia,
                        cep: cep_correspondencia
                    }
                ],

                contato: [
                    {
                        tipo: 'importado',
                        descricao: numero_telefone
                    },
                    {
                        tipo: 'email',
                        descricao: email
                    }
                ],
                dirigente,
                presidente,
                templo,
                membros,
                superitendencia: {
                    nome: nome_superintendencia,
                    localizacao,
                    regiao
                },
                contribuicoes: {
                    dd,
                    pn,
                    taxa
                },
                observacao: [
                    {
                    titulo: 'importado',
                    descricao: observacao_descricao
                }
                ]
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

        igrejas.map(async (igreja) => {
            
            const {ri} = igreja
            const existIgreja = this.igrejasRepository.findByRI(ri);

            if(!existIgreja) {
                
               this.igrejasRepository.create(igreja)
                
            }

        })
    }

}

export {ImportIgrejaUseCase}