import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../transactions/transactions.model';
import { User } from '../users/users.model';

interface WalletCreationAttr {
  title: string;
}

@Table({ tableName: 'wallets' })
export class Wallet extends Model<Wallet, WalletCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'My main wallet',
    description: "Wallet's title",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'RUB',
    description: "Wallet's currency",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency: string;

  @ApiProperty({
    example: 'This wallet for main expenses',
    description: "Wallet's description",
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Transaction, { onDelete: 'cascade' })
  transactions: Transaction[];
}
