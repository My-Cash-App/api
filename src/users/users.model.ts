import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Code } from '../auth/models/codes.model';
import { Role } from '../roles/roles.model';
import { RefreshToken } from '../auth/models/refresh-tokens.model';
import { TransactionCategory } from '../transaction-categories/transaction-categories.model';
import { TransactionSubCategory } from '../transaction-categories/transaction-sub-categories.model';
import { Wallet } from '../wallets/wallets.model';

interface UserCreationAttr {
  phone: number;
  roleId: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 79529139340,
    description: "User's mobile phone number",
  })
  @Column({
    type: DataType.BIGINT,
    unique: true,
    primaryKey: true,
    allowNull: false,
  })
  phone: number;

  @ApiProperty({
    example: 1,
    description: 'Role ID',
  })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasOne(() => Code, { onDelete: 'cascade' })
  code: Code;

  @HasOne(() => RefreshToken, { onDelete: 'cascade' })
  token: RefreshToken;

  @HasMany(() => TransactionCategory, { onDelete: 'cascade' })
  transactionCategory: TransactionCategory[];

  @HasMany(() => TransactionSubCategory, { onDelete: 'cascade' })
  transactionSubCategory: TransactionSubCategory[];

  @HasMany(() => Wallet, { onDelete: 'cascade' })
  wallet: Wallet[];
}
