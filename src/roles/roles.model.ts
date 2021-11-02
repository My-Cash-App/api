import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface RoleCreationAttr {
  value: string;
  description: string;
  weight: number;
}

/*
 * SUPER_ADMIN - 0
 * ADMIN - 1
 * EDITOR - 2
 * MODERATOR - 3
 * USER - 5
 * */

@ApiTags('Role model')
@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'USER',
    description: 'Regular application user',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'Some text with description of value',
    description: 'Regular application user',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'Weight this role',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  weight: number;

  @HasMany(() => User, { onDelete: 'cascade' })
  users: User[];
}
