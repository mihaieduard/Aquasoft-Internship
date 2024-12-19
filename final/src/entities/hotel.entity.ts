import { Column, DataType, ForeignKey, Model, Table, BelongsTo, HasMany } from 'sequelize-typescript';
import { Region } from './region.entity';
import { City } from './cities.entity';
import { PriceOffer } from './priceOffer.entity';

@Table({ tableName: 'Hotel', timestamps: false }) // No timestamps needed
export class Hotel extends Model<Hotel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  HotelID: number;

  @Column(DataType.STRING)
  HotelName: string;

  @Column(DataType.DECIMAL(9, 6))
  Latitude: number;

  @Column(DataType.DECIMAL(9, 6))
  Longitude: number;

  @ForeignKey(() => Region)
  @Column(DataType.INTEGER)
  RegionID: number;

  @ForeignKey(() => City)
  @Column(DataType.INTEGER)
  CityID: number;

  @Column(DataType.TEXT)
  Address: string;

  @HasMany(() => PriceOffer)
  PriceOffers: PriceOffer[];
}