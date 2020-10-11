import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IAuthUser, ITokenResponse } from '../../common/interfaces/http.interface';
import { JwtService } from '@nestjs/jwt';
import secret from 'src/config/secret.config';
import { PliHttpStatus } from '../../common/utils/pliCode';
import { MongoRepository } from 'typeorm';
import { User } from '../../databse/entities/user.entity';
import { UserRespositoryToken } from '../../databse/respository.token';

const CryptoJS = require("crypto-js");

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserRespositoryToken) private readonly userRepository: MongoRepository<User>,
  ) { }

  validateUser(username: string, password: string): IAuthUser {
    // const decrypted = CryptoJS.AES.decrypt(password, secret.aes).toString(CryptoJS.enc.Utf8);
    // console.log(decrypted);
    // const { phone, code }
    // TODO: - fetch user from mongodb
    return { nickName: 'muxkou', phone: username, uuid: 'xxx' };
  }

  async validateUserByPhoneCode(encryptedCode: string, phone: string, code: string): Promise<IAuthUser> {
    const decryptedStr = CryptoJS.AES.decrypt(encryptedCode, secret.aes).toString(CryptoJS.enc.Utf8);
    const decrypted = JSON.parse(decryptedStr);
    if (phone != decrypted.phone) {
      const error = {
        message: 'Phone number is different with the sms reciver.',
        statusCode: PliHttpStatus.AUTH_PHONE_NUMBER_DIFF
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    } else if (code != decrypted.code) {
      const error = {
        message: 'Code is wroing.',
        statusCode: PliHttpStatus.AUTH_CODE_DIFF
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    } else {
      const found = await this.userRepository.findOne({ where: { phone: phone } })
      if (found) {
        // found user and return
        return { nickName: found.nickName, phone: found.phone, uuid: found.uuid };
      } else {
        // not found, register user 
        const total = await this.userRepository.count();
        const intId = total + 1;
        let register = new User();
        if (intId > 9999) {
          register.uuid = `p${intId}`;
        } else {
          register.uuid = 'p' + (Array(4).join('0') + intId).slice(-4);
        }
        register.nickName = `Pli-${intId}`;
        register.level = 1;
        register.phone = phone;
        const created = await this.userRepository.save(register);
        return { nickName: created.nickName, phone: created.phone, uuid: created.uuid };
      }
    }
  }

  async login(user: IAuthUser): Promise<ITokenResponse> {
    const payload = { 
      uuid: user.uuid, 
      phone: user.phone, 
      nickName: user.nickName 
    };
    return {
      Authorization: this.jwtService.sign(payload),
      user: payload
    };
  }

}
