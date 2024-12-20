import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class TokenBlacklist extends Model {
  @Column
  token: string;

  @Column
  expiresAt: Date;
}