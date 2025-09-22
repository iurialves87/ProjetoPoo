import { Cliente } from './Cliente';
import { ContaCorrente, ContaPoupanca } from './Conta';

const cliente1 = new Cliente('Iuri', '123.456.789-00');
const cliente2 = new Cliente('Ana', '987.654.321-00');

const conta1 = new ContaCorrente('0001', 500);
const conta2 = new ContaPoupanca('0002');

cliente1.adicionarConta(conta1);
cliente2.adicionarConta(conta2);

conta1.depositar(1000);
conta2.depositar(2000);

console.log('Saldo inicial conta1:', conta1.getSaldo());
console.log('Saldo inicial conta2:', conta2.getSaldo());

conta1.transferir(200, conta2);

console.log('Saldo conta1 após transferência:', conta1.getSaldo());
console.log('Saldo conta2 após transferência:', conta2.getSaldo());

(conta2 as ContaPoupanca).renderJuros(0.05);
console.log('Saldo conta2 após render juros 5%:', conta2.getSaldo());

console.log('Cliente1 JSON:', JSON.stringify(cliente1, null, 2));
console.log('Cliente2 JSON:', JSON.stringify(cliente2, null, 2));
