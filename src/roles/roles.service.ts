import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      return await this.roleRepository.create(createRoleDto);
    } catch (e) {
      if (e.original.code === '23505') {
        throw new HttpException(
          'Данная роль существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw e;
    }
  }

  getByValue(value: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { value } });
  }
}
