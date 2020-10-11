import { createConnection } from 'typeorm';
import secret from 'src/config/secret.config';

export const databaseProviders = [
  {
    provide: secret.db,
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'pilipili',
        useUnifiedTopology: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
];