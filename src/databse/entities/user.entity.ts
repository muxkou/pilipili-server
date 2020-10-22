import { Entity, Column, ObjectID, PrimaryColumn, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn() id: ObjectID;
  @PrimaryColumn() uuid: string;
  @Column() phone: string;
  @Column() nickName: string;
  @Column() level: number;
  @Column() password: string;
}