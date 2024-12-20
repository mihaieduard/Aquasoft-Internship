import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Hotel } from './hotel.entity';

@Table({ tableName: 'PriceOffers', timestamps: false }) // No timestamps needed
export class PriceOffer extends Model<PriceOffer> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  OfferID: number;

  @ForeignKey(() => Hotel)
  @Column(DataType.INTEGER)
  HotelID: number;

  @Column(DataType.STRING)
  PriceCategory: string;

  @Column(DataType.DECIMAL(10, 2))
  Price: number;

  @Column(DataType.STRING)
  Category: string;

  @BelongsTo(() => Hotel)
  hotel: Hotel;
}
