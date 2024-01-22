# Gerenciamento de Clientes

#para startar o banco de dados
```bash
docker-compose up -d --build
```

Rodar no banco o script SQL para criar a tabela customer: api/src/infra/pg_sql/sql/create_db.sql

#em /client rodar:
```bash
npm run dev
```

#em outro terminal, em /api, rodar:
```bash
npm run dev
```
#Tecnologias

##Backend

- Linguagem de Programação: TypeScript
- Framework Web: Express.js
- Banco de Dados: PostgreSQL
- Contêinerização: Docker
- Orquestração de Contêineres: Docker Compose
- Ambiente de Desenvolvimento: Node.js
- Gerenciador de Pacotes: npm
- Testes Automatizados: Jest

##Frontend

- Linguagem de Programação: TypeScript
- Biblioteca de UI: Ant Design
- Framework de Aplicativo Web: React
- Gerenciamento de Estado: useState, useContext (React Hooks)
- Requisições HTTP: Axios
- Formulários: Ant Design Form, rc-input
- Roteamento: React Router
- Estilização: Tailwind CSS
- Mensagens de Notificação: Ant Design Message
- Paginação Infinita: react-infinite-scroll-component

#autor

Guilherme de Oliveira Amorim

guilherme.o.a.ufal@gmail.com