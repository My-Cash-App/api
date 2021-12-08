import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionCategory } from './transaction-categories.model';
import { User } from '../users/users.model';

interface TransactionSubCategoryAttr {
  title: string;
  categoryId: number;
}

@Table({ tableName: 'transaction-sub-categories' })
export class TransactionSubCategory extends Model<
  TransactionSubCategory,
  TransactionSubCategoryAttr
> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Service',
    description: 'Some transaction sub-category',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Wallet ID',
  })
  @ForeignKey(() => TransactionCategory)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => TransactionCategory)
  category: TransactionCategory;

  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
