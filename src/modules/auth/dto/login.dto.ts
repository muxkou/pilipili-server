import { IsNotEmpty, Length } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  encryptedCode: string;
  @IsNotEmpty() 
  phone: string;
  @Length(4, 4, { message: 'The vertify code length should be 4' })
  @IsNotEmpty() 
  code: string;
};