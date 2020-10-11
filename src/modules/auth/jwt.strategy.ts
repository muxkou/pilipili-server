import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import secret from 'src/config/secret.config';
import { AuthService } from './auth.service';
import { IAuthUser } from '../../common/interfaces/http.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret.jwt,
    });
  }

  async validate(payload: any): Promise<IAuthUser>  {
    return { uuid: payload.uuid, phone: payload.phone, nickName: payload.nickName };
  }
}