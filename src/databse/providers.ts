import { Connection, getMongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import secret from 'src/config/secret.config';
import { UserRespositoryToken } from './respository.token';

export const UserDBProviders = {
  provide: UserRespositoryToken,
  useFactory: (connection: Connection) => getMongoRepository(User),
  inject: [secret.db],
};