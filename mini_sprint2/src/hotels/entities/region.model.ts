// src/regions/entities/region.model.ts
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Regions', timestamps: false }) // No timestamps needed
export class Region extends Model<Region> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  RegionID: number;

  @Column(DataType.STRING)
  RegionName: string;

  @Column(DataType.STRING)
  Country: string;
}
