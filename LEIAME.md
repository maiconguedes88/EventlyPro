# Evently — como colocar no ar

Projeto estático (HTML, CSS e JavaScript), com Firebase (login e banco Firestore) e publicação na Vercel. Não precisa de build nem de Node.

## 1. Firebase (uma vez só)
1. Em console.firebase.google.com, crie um projeto (pode desativar o Google Analytics).
2. **Authentication > Método de login**: ative **E-mail/senha**.
3. **Firestore Database > Criar banco**: modo produção, região `southamerica-east1` (São Paulo).
4. **Firestore > Regras**: cole o conteúdo de `firestore.rules` e publique.
5. **Configurações do projeto > Seus apps > Web (</>)**: registre o app e copie o objeto de configuração para `firebase-config.js`.

## 2. Vercel
1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel: **Add New > Project**, importe o repositório. Framework: **Other**. Deixe build e output em branco.
3. Depois do deploy, copie o domínio (ex.: `evently.vercel.app`) e adicione em **Firebase > Authentication > Configurações > Domínios autorizados**.

## 3. Testar o modo offline
1. No celular, abra o endereço com internet e entre na conta. Abra a aba **Convidados** do evento.
2. Use "Adicionar à tela inicial" (instala como app).
3. Ative o modo avião, abra o app e faça check-ins. Eles aparecem como "a sincronizar".
4. Desative o modo avião: os dados sobem sozinhos.

Importante: o primeiro acesso de cada aparelho precisa de internet. Antes do evento, abra o app com internet para baixar os dados.

## Como os dados ficam
`accounts/{uid}/{clients|suppliers|events|costs|receipts|guests}/{id}` — um documento por item. Dois assistentes marcando convidados diferentes não se sobrescrevem. Se marcarem o mesmo convidado ao mesmo tempo, vale a última gravação.
