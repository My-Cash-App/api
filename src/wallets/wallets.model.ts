import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '../transactions/transactions.model';

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

  @HasMany(() => Transaction, { onDelete: 'cascade' })
  users: Transaction[];
}
