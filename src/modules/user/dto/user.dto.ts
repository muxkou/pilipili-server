import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class UserDTO {
  @Expose()
  @IsString()
  readonly uuid: string;

  @Expose()
  @IsString()
  readonly nickName: string;

  @Expose()
  @IsString()
  readonly phone: string;

  @Expose()
  @IsNumber()
  readonly level: number;
}