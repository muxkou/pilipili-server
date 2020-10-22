import { IsNotEmpty, Length, Matches } from 'class-validator';
import { regPassword } from '../../../common/utils/regex';

export class RegisterDTO {
  @IsNotEmpty()
  encryptedCode: string;

  @IsNotEmpty()
  phone: string;
  @Length(4, 4, { message: 'The vertify code length should be 4' })
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  @Length(2, 12, { message: 'The nick name length should be 2 - 12' })
  nickName: string;

  // @Matches(regPassword)
  @IsNotEmpty()
  password: string;
};