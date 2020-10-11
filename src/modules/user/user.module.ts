import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDBProviders } from '../../databse/providers';
import { DatabaseModule } from '../../databse/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserDBProviders]
})
export class UserModule {}
