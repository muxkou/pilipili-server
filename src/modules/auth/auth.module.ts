import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from '../../databse/database.module';
import { UserDBProviders } from '../../databse/providers';
import secret from 'src/config/secret.config';

@Module({
  imports: [
  PassportModule,
    JwtModule.register({
      secret: secret.jwt,
      signOptions: { expiresIn: '12h' },
    }),
    DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserDBProviders],
  exports: [AuthService]    
})  
export class AuthModule {}
