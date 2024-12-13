import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Hotel } from './hotel.model';

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

  @BelongsTo(() => Hotel)
  hotel: Hotel;
}
