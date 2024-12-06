// src/zones/entities/zone.model.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { Region } from './region.model';

@Table({ tableName: 'Zones', timestamps: false }) // No timestamps needed
export class Zone extends Model<Zone> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  ZoneID: number;

  @ForeignKey(() => Region)
  @Column(DataType.INTEGER)
  RegionID: number;

  @Column(DataType.STRING)
  ZoneName: string;
}
