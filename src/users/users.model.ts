import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Code } from '../auth/models/codes.model';
import { Role } from '../roles/roles.model';
import { RefreshToken } from '../auth/models/refresh-tokens.model';

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

  @HasOne(() => Code, { onDelete: 'cascade' })
  code: Code;

  @HasOne(() => RefreshToken, { onDelete: 'cascade' })
  token: RefreshToken;

  @ApiProperty({
    example: 1,
    description: 'Role ID',
  })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
