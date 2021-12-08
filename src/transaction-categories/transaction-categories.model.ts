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
import { TransactionSubCategory } from './transaction-sub-categories.model';
import { User } from '../users/users.model';

interface TransactionCategoryAttr {
  title: string;
}

@Table({ tableName: 'transaction-categories' })
export class TransactionCategory extends Model<
  TransactionCategory,
  TransactionCategoryAttr
> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Car', description: 'Some transaction category' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @HasMany(() => TransactionSubCategory, { onDelete: 'cascade' })
  subCategories: TransactionSubCategory[];

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
