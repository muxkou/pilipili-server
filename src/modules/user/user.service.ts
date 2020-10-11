import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { User } from '../../databse/entities/user.entity';
import { UserRespositoryToken } from '../../databse/respository.token';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRespositoryToken)
    private readonly userRepository: MongoRepository<User>
  ) { }

  async getUser(uuid: string): Promise<User> {
    return await this.userRepository.findOne({ where: { uuid: uuid } });
  }
}
