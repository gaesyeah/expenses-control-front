# ExpensesControl

Front-end do sistema de controle de gastos residenciais, desenvolvido como
desafio técnico de estágio em TI (Desenvolvimento). Consome a API
[expenses-control-back](https://github.com/gaesyeah/expenses-control-back)
para cadastro de pessoas, transações financeiras e consulta de totais.

## Sobre as decisões técnicas deste projeto

Este é um projeto relativamente simples, e a maior parte das decisões abaixo
não seria estritamente necessária para o seu tamanho atual. Optei, no entanto,
por aplicar algumas práticas mais avançadas de propósito, como o uso de
**generics** para construir componentes reaproveitáveis (especialmente
`Input` e formulários tipados), para demonstrar o tipo de arquitetura 
que eu adotaria em um sistema real de grande porte, onde esse nível de reuso
e segurança de tipos se paga rapidamente.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** como build tool
- **React Router** para navegação entre telas
- **TanStack Query** para cache, loading e revalidação de dados da API
- **Axios** para requisições HTTP
- **styled-components** para estilização, com tema tipado
- **SweetAlert2** para confirmações e alertas
- **react-toastify** para notificações de sucesso/erro
- **react-icons** e **react-loader-spinner** para ícones e indicadores de carregamento

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- O back-end do projeto rodando (local ou usando a API já publicada) — veja as
  instruções em [expenses-control-back](https://github.com/gaesyeah/expenses-control-back)

## Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/gaesyeah/expenses-control-front.git
   cd expenses-control-front
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Renomeie o arquivo `.env.example` para `.env`, e ajuste a URL da API
   conforme o ambiente desejado:

   ```bash
   # VITE_API_URL=https://expenses-control-api.onrender.com
   VITE_API_URL=http://localhost:5228
   ```

   Por padrão, o projeto já vem configurado para apontar para a API local.

4. Rode a aplicação:

   ```bash
   npm run dev
   ```

### Testando localmente com o back-end

Para testar o front-end contra a API local, é necessário que o back-end
esteja rodando antes. Siga as instruções de setup em
[expenses-control-back](https://github.com/gaesyeah/expenses-control-back)
para clonar e rodar a API.

## Sobre a persistência de dados do back-end

O back-end utiliza **SQLite**. No ambiente hospedado (plano gratuito do
Render), o sistema de arquivos é efêmero — ou seja, os dados podem ser
resetados quando o serviço reinicia ou fica inativo por um tempo. Isso é
esperado e não é um bug: a persistência real foi validada localmente, e o
ambiente publicado serve principalmente para demonstração.

## Deploy

O front-end está publicado em:

```
https://expenses-control-front.vercel.app/
```
