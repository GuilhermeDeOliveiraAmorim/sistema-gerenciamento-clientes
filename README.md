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

#autor

Guilherme de Oliveira Amorim

guilherme.o.a.ufal@gmail.com