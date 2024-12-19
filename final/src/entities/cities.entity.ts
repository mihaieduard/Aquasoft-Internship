// src/cities/entities/city.model.ts
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Cities', timestamps: false }) // No timestamps needed
export class City extends Model<City> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  CityID: number;

  @Column(DataType.STRING)
  CityName: string;

  @Column(DataType.STRING)
  Country: string;
}
