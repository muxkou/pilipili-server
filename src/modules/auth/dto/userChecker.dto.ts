import { IsNotEmpty, IsOptional } from "class-validator";

export class UserCheckerDTO {
  @IsOptional()
  @IsNotEmpty()
  phone?: string;
  
  @IsOptional()
  @IsNotEmpty()
  nickName?: string
}