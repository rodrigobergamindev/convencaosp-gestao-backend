interface Pagamento {
    data: string;
    tipo: string;
}


interface IAnuidade {
    valor_credencial: string;
    envio: string;
    pagamentos?: Pagamento[]
}

export {IAnuidade}