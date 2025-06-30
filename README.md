# ProdKit

ProdKit é uma aplicação full stack composta por uma API ASP.NET Core e uma interface web Angular. O projeto reúne diversas ferramentas úteis em um único lugar.

## Funcionalidades

- **Tradutor**: traduz textos para diversos idiomas utilizando a API do DeepL.
- **Extrator de áudio**: extrai o áudio (MP3) de arquivos de vídeo no formato MP4.
- **Gerador de senhas**: cria senhas seguras de acordo com os critérios informados pelo usuário.
- **Formatador de JSON/XML**: formata arquivos JSON ou XML para facilitar a leitura.
- **Validador de documentos**: valida números de CPF, CNPJ e CEP.

## Requisitos

- [.NET SDK 9.0](https://dotnet.microsoft.com/)
- [Node.js](https://nodejs.org/) e [Angular CLI](https://angular.dev/)
- Git

## Instalação

1. Clone este repositório.
2. Instale as dependências do frontend:
   ```bash
   cd ProdKit
   npm install
   ```
3. Compile a solução .NET:
   ```bash
   dotnet build
   ```

## Execução

### Backend

Inicie a API executando:

```bash
dotnet run --project ProdKit.API
```

A API ficará disponível em `http://localhost:5220` por padrão.

### Frontend

Na pasta `ProdKit`, execute:

```bash
ng serve
```

A aplicação Angular poderá ser acessada em `http://localhost:4200`.

## Testes

### Backend

```bash
dotnet test
```

### Frontend

```bash
ng test
```

## Estrutura do Repositório

- `ProdKit.API` &ndash; API ASP.NET Core.
- `ProdKit.Application`, `ProdKit.Domain`, `ProdKit.Infrastructure` &ndash; camadas de aplicação.
- `ProdKit` &ndash; interface web Angular.
- `ProdKit.Tests` &ndash; testes unitários da API.
