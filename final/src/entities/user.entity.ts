import { Table, HasMany, Column, Model, BeforeCreate, DataType, PrimaryKey, AutoIncrement, CreatedAt, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Role } from './roles.entity';


@Table({ tableName: 'Users', timestamps: false })
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
    lastName: string;

    @IsEmail()
    @Column(DataType.STRING)
    email: string;

    @Column({
        type: DataType.STRING,
        defaultValue: "123"
    })
    password: string;

    @ForeignKey(() => Role)
    @Column(DataType.INTEGER)
    RoleId: number;

    @BelongsTo(() => Role)
    role: Role;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    ManagerId: number;  // Managerul acestui utilizator

    @BelongsTo(() => User)
    manager: User;  // Managerul utilizatorului (auto-referent)

    @HasMany(() => User)
    subordinates: User[];  // Subordonații acestui utilizator (folosit pentru manageri)

    @BeforeCreate
    static async hashPassword(instance: User) {
        instance.password = await bcrypt.hash(instance.password, 8);
    }
}
