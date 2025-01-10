import {Table, Column, Model, DataType, PrimaryKey, AllowNull, AutoIncrement} from 'sequelize-typescript'

@Table({
    tableName: 'stores',
    timestamps: true,
    underscored: false,
})

export class Store extends Model<Store> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        allowNull: false,
    })
    storeID!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    storeName!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull:false,
    })
    takeOutInStore!: boolean

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    shippingTimeInDays!: number

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    latitude!: string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    longitude!: string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    address1!: string;

    @Column({
        type: DataType.STRING,
        allowNull:true,
    })
    address2!: string;

    @Column({
        type: DataType.STRING,
        allowNull:true,
    })
    address3!: string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    city!: string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    district!: string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    state!: string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    type!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    country!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    postalCode!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    telephoneNumber?: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    emailAddress?: string;

}