import { Table, Column, Model, BeforeCreate, DataType, PrimaryKey, AutoIncrement, CreatedAt, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';


@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    RoleId: number;

    @Column(DataType.STRING)
    RoleName: string;

    @HasMany(() => User)
    users: User[];
    
}
