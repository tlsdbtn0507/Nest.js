import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{

  @PrimaryColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

}