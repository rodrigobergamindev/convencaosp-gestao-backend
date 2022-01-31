
import { v4 as uuidV4 } from 'uuid'

class Oficial {
    created_at: Date;
    id?: string;

    ro: string;
    funcao: string;
    nome: string;
    dirigente: boolean;
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
    valor_credencial: string;
    pagamento_2016: string;
    tipo_2016: string;
    pagamento_2017: string;
    tipo_2017: string; 
    pagamento_2018: string; 
    tipo_2018: string;
    pagamento_2019: string; 
    tipo_2019: string; 
    pagamento_2020: string; 
    tipo_2020: string;
    pagamento_2021: string; 
    tipo_2021: string; 
    data_de_envio: string; 
    observacao: string;

    constructor() {
        if(!this.id) { 
            this.id = uuidV4()
        }
    }
}


export { Oficial }