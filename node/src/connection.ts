import { Knex, knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'testefullstack',
    port: 5432,
  },
};

const knexInstance = knex(config);

export default knexInstance;
