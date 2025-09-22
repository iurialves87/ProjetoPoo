import { Conta } from './Conta';

export class Cliente {
    private contas: Conta[] = [];
    private chavesPIX: Map<string, Conta> = new Map();

    constructor(public readonly nome: string, public readonly cpf: string) {}

    adicionarConta(conta: Conta) {
        this.contas.push(conta);
    }

    registrarChavePIX(chave: string, conta: Conta) {
        this.chavesPIX.set(chave, conta);
    }

    transferirPIX(valor: number, chaveDestino: string) {
        const contaDestino = this.chavesPIX.get(chaveDestino);
        if (!contaDestino) throw new Error('Chave PIX não encontrada');

        const contaOrigem = this.contas[0];
        if (!contaOrigem) throw new Error('Cliente sem contas para transferir');

        contaOrigem.transferir(valor, contaDestino);
    }

    toJSON() {
        return {
            nome: this.nome,
            contas: this.contas.map(c => c.toJSON())
        };
    }
}
