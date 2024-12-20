import { Column, DataType, ForeignKey, Model, Table, BelongsTo, HasMany } from 'sequelize-typescript';
import { Region } from './region.entity';
import { City } from './cities.entity';
import { PriceOffer } from './priceOffer.entity';
import { HotelGroup } from './hotelGroup.entity';
import { User } from './user.entity';

@Table({ tableName: 'Hotel', timestamps: false })
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

  @ForeignKey(() => HotelGroup)
  @Column(DataType.INTEGER)
  GroupID: number;

  @Column(DataType.TEXT)
  Address: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  ManagerId: number;
  
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  ManagerGroupId: number;

  @HasMany(() => PriceOffer)
  PriceOffers: PriceOffer[];

  @BelongsTo(() => User)
  Manager: User;  // Relația Hotel -> User (Manager)

  @BelongsTo(() => User)
  ManagerGroup: User;  // Relația Hotel -> User (Manager)
}
