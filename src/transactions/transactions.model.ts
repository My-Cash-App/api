import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../wallets/wallets.model';

interface TransactionCreationAttr {
  title: string;
}

@Table({ tableName: 'transactions' })
export class Transaction extends Model<Transaction, TransactionCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1500, description: "transaction's amount" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  currency: string;

  @ApiProperty({
    example: 1,
    description: 'Wallet ID',
  })
  @ForeignKey(() => Wallet)
  @Column({ type: DataType.INTEGER })
  walletId: number;

  @BelongsTo(() => Wallet)
  wallet: Wallet;
}
