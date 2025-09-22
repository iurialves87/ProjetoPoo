export type TipoTransacao = 'DEBITO' | 'CREDITO';

export class Transacao {
    constructor(
        public readonly tipo: TipoTransacao,
        public readonly valor: number,
        public readonly data: Date = new Date()
    ) {}

    static criarTransferencia(valor: number, contaOrigem: any, contaDestino: any) {
        const debito = new Transacao('DEBITO', valor);
        contaOrigem.adicionarTransacao(debito);
        contaOrigem.sacar(valor);

        const credito = new Transacao('CREDITO', valor);
        contaDestino.adicionarTransacao(credito);
        contaDestino.depositar(valor);

        return [debito, credito];
    }
}
