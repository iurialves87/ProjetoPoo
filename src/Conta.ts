import { Transacao } from './Transacao';

export abstract class Conta {
    private saldo: number = 0;
    private transacoes: Transacao[] = [];

    constructor(public readonly numero: string) {}

    depositar(valor: number): void {
        if (valor <= 0) throw new Error('Valor do depósito deve ser positivo');
        this.saldo += valor;
        this.transacoes.push(new Transacao('CREDITO', valor));
    }

    sacar(valor: number): void {
        if (valor <= 0) throw new Error('Valor do saque deve ser positivo');
        if (valor > this.saldo) throw new Error('Saldo insuficiente');
        this.saldo -= valor;
        this.transacoes.push(new Transacao('DEBITO', valor));
    }

    transferir(valor: number, contaDestino: Conta): void {
        Transacao.criarTransferencia(valor, this, contaDestino);
    }

    adicionarTransacao(transacao: Transacao): void {
        this.transacoes.push(transacao);
    }

    getSaldo(): number {
        return this.saldo;
    }

    getExtrato(): Transacao[] {
        return [...this.transacoes];
    }

    toJSON() {
        return {
            numero: this.numero,
            saldo: this.saldo,
            transacoes: this.transacoes
        };
    }
}

export class ContaCorrente extends Conta {
    constructor(numero: string, private limiteChequeEspecial: number = 0) {
        super(numero);
    }

    sacar(valor: number): void {
        if (valor <= 0) throw new Error('Valor do saque deve ser positivo');
        if (valor > this.getSaldo() + this.limiteChequeEspecial)
            throw new Error('Saldo insuficiente, mesmo considerando cheque especial');
        super.sacar(valor); 
    }
}

export class ContaPoupanca extends Conta {
    renderJuros(taxa: number): void {
        if (taxa <= 0) throw new Error('Taxa de juros inválida');
        const juros = this.getSaldo() * taxa;
        this.depositar(juros);
    }
}
