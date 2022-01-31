import {Request, Response} from 'express'
import fs from 'fs'
import {parse} from "csv-parse"

const importOficiais = (request: Request, response: Response) => {

    const oficiais = {
        data: []
    }
        const {file} = request
        

        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file?.path)

            const parseFile = parse()


        stream.pipe(parseFile)

        parseFile.on("data", async(line) => {
           const [
            ro, funcao, nome, dirigente, endereco, 
            bairro, cidade, uf, cep, telefone, email, 
            rg, cpf, nascimento, consagracao, ri_igreja, 
            valor_credencial, pagamento_2016, tipo_2016, pagamento_2017, 
            tipo_2017, pagamento_2018, tipo_2018, pagamento_2019, tipo_2019, 
            pagamento_2020, tipo_2020, pagamento_2021, tipo_2021, data_de_envio, 
            observacao
           ] = line

           oficiais.data.push({
            ro, funcao, nome, dirigente, endereco, 
            bairro, cidade, uf, cep, telefone, email, 
            rg, cpf, nascimento, consagracao, ri_igreja, 
            valor_credencial, pagamento_2016, tipo_2016, pagamento_2017, 
            tipo_2017, pagamento_2018, tipo_2018, pagamento_2019, tipo_2019, 
            pagamento_2020, tipo_2020, pagamento_2021, tipo_2021, data_de_envio, 
            observacao
           })
        })
        .on("end", () => {
            resolve(oficiais)
            return response.json(oficiais)
        })
        .on("error", (err) => {
           reject(err)
           return response.send("Algo de errado ocorreu com o arquivo")
        })


        })
}


export {importOficiais}