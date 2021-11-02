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

interface RefreshTokenCreationAttr {
  token: string;
  userId: number;
}

@ApiTags('Refresh Token model')
@Table({ tableName: 'refresh_tokens' })
export class RefreshToken extends Model<
  RefreshToken,
  RefreshTokenCreationAttr
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
    example: 'some token',
    description: "User's refresh token",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  token: string;

  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
