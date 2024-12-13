import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'HotelGroups', timestamps: false }) // No timestamps needed
export class HotelGroup extends Model<HotelGroup> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  GroupID: number;

  @Column(DataType.STRING)
  GroupName: string;
}
