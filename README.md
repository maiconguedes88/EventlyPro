# Evently

Aplicação web para organizar a rotina de cerimonialistas: do planejamento do evento ao acompanhamento financeiro e ao check-in dos convidados.

O Evently foi desenvolvido para reunir informações que costumam ficar espalhadas em planilhas e conversas. Em uma interface responsiva, cada profissional pode acompanhar seus eventos, clientes, fornecedores, pagamentos e listas de convidados.

## Funcionalidades

- **Painel de acompanhamento:** próximos eventos, pendências, recebimentos previstos e pagamentos vencidos.
- **Gestão de eventos:** cadastro de data, local, cliente, orçamento, status e fornecedores contratados.
- **Clientes e fornecedores:** organização de contatos e acesso rápido ao WhatsApp quando há telefone cadastrado.
- **Financeiro separado por contexto:** recebimentos de honorários dos clientes e custos operacionais de cada evento.
- **Convidados e check-in:** listas por evento, acompanhantes, mesas, check-in individual ou em grupo e importação por lista de nomes.
- **Personalização:** tema claro/escuro, paletas de cores e inclusão do logotipo da empresa.
- **Contas individuais:** autenticação por e-mail e senha, com dados associados à conta de cada cerimonialista.
- **Experiência instalável:** aplicação web progressiva (PWA), com interface adaptada para celular e desktop.
- **Uso com conectividade instável:** o Firestore mantém cache local e sincroniza alterações quando a conexão retorna. O primeiro acesso e a autenticação precisam de internet.

## Tecnologias

- HTML, CSS e JavaScript com módulos ES.
- Firebase Authentication para cadastro e login.
- Cloud Firestore para armazenamento e sincronização dos dados.
- Service worker e Web App Manifest para recursos de PWA e cache da interface.
- Vercel para publicação como site estático.

## Como executar

O projeto não requer etapa de build. Como utiliza módulos JavaScript, Firebase e service worker, execute-o por um servidor local — não abrindo `index.html` diretamente como arquivo.

1. Clone ou baixe este repositório.
2. Configure o Firebase seguindo a seção abaixo.
3. Sirva a pasta do projeto com uma extensão de servidor local, como **Live Server** no VS Code.
4. Abra o endereço local fornecido pelo servidor.

## Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Registre um aplicativo Web e copie os dados de configuração.
3. Substitua os valores de exemplo em [`firebase-config.js`](./firebase-config.js).
4. Em **Authentication**, habilite o provedor **E-mail/senha**.
5. Crie o banco **Cloud Firestore** e publique as regras de [`firestore.rules`](./firestore.rules).
6. Para publicar o aplicativo, adicione o domínio de produção à lista de domínios autorizados do Firebase Authentication.

As regras deste projeto limitam a leitura e a gravação ao usuário autenticado correspondente ao identificador da conta. A configuração do Firebase para Web é usada no navegador; a proteção dos dados deve ser feita pelas regras do Firestore, não pela ocultação da chave de configuração.

Para mais detalhes sobre a configuração e a publicação, consulte [`LEIAME.md`](./LEIAME.md).

## Estrutura dos dados

Os registros são organizados por conta no Firestore, em coleções como `clients`, `suppliers`, `events`, `costs`, `receipts` e `guests`. Assim, cada usuário trabalha com seus próprios dados. As alterações realizadas sem conexão podem aguardar a sincronização, que depende da conectividade e do funcionamento do Firebase.

## Sobre o projeto

O Evently demonstra a aplicação de conceitos de desenvolvimento web em um cenário real de organização de eventos: modelagem de dados relacionados, autenticação, atualização em tempo real, interface responsiva e experiência offline-first com serviços gerenciados na nuvem.

---

**Projeto de portfólio — Evently**
