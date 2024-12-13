import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { City } from './city.model';

@Table({ tableName: 'Airports', timestamps: false }) // No timestamps needed
export class Airport extends Model<Airport> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  ID: number;

  @Column(DataType.STRING)
  iata_code: string;

  @Column(DataType.STRING)
  airport_name: string;

  @ForeignKey(() => City)
  @Column(DataType.INTEGER)
  CityID: number;

  @Column(DataType.DECIMAL(9, 6))
  Latitude: number;

  @Column(DataType.DECIMAL(9, 6))
  Longitude: number;

  @BelongsTo(() => City)
  city: City;
}
