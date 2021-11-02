import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '../../users/users.model';

interface AuthCreationAttr {
  value: number;
  last_query: Date;
  userId: number;
}

@ApiTags('Code model')
@Table({ tableName: 'codes' })
export class Code extends Model<Code, AuthCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '7412',
    description: 'Code for authorization',
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  value: number;

  @ApiProperty({
    example: '2021-10-25T11:00:00Z',
    description: 'Last data query code',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  last_query: Date;

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
