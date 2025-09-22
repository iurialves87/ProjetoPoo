# Sistema Bancário Simplificado em TypeScript

## 1. Descrição do Projeto

O projeto é um sistema bancário simplificado, feito em TypeScript, que demonstra conceitos de Programação Orientada a Objetos (POO).  
Ele simula clientes com contas bancárias, transações (depósitos, saques, transferências) e suporte a chaves PIX.

### Objetivos principais

- Encapsulamento: o saldo da conta é privado e só pode ser alterado por métodos de negócio (depositar, sacar, transferir).
- Regras de validação: impedem depósitos/saques inválidos e garantem integridade nas transferências.
- Herança: classe abstrata Conta com duas subclasses (ContaCorrente e ContaPoupanca).
- Composição: as contas armazenam seu histórico de transações.
- Serialização segura: com toJSON(), exportamos apenas dados necessários, sem expor atributos internos.

## 2. Decisões de Design

- Cliente e Conta (Associação 1:N): um cliente pode ter várias contas. Um correntista pode abrir conta corrente, poupança, etc.
- Conta e Transação (Composição): uma conta é composta por suas transações (extrato). Se a conta não existe, o extrato não faz sentido existir sozinho.
- Saldo como private: o saldo só pode ser modificado via métodos controlados, reforçando encapsulamento.
- Método estático em Transação (criarTransferencia): garante atomicidade em transferências, evitando que apenas metade da operação seja executada.
- Herança:
  - ContaCorrente adiciona limite de cheque especial.
  - ContaPoupanca tem método renderJuros para simular rendimento.
- PIX via Map de chaves: implementado como Map<string, Conta>, permitindo cadastro de chaves como CPF ou e-mail sem busca manual.

Essas decisões seguem princípios de coerência de domínio e SOLID.

## 3. Como Executar o Projeto

### Criar o projeto TypeScript

```bash
mkdir ProjetoPoo
cd ProjetoPoo
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init

### Estrutura de pastas

ProjetoPoo/
├── src/
│   ├── Cliente.ts
│   ├── Conta.ts
│   ├── Transacao.ts
│   └── index.ts
└── tsconfig.json

### Rodar o projeto

npx ts-node src/index.ts