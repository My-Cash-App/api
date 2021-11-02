import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FindOrCreateWhenAuthDto } from './dto/find-or-create-when-auth.dto';
import { Role } from '../roles/roles.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create({
      phone: createUserDto.phone,
      roleId: createUserDto.roleId,
    });
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll({ include: Role });
  }

  async findOrCreateWhenAuth(
    findOrCreateWhenAuthDto: FindOrCreateWhenAuthDto,
  ): Promise<User> {
    const { phone, roleId } = findOrCreateWhenAuthDto;

    const [user] = await this.userRepository.findOrCreate({
      where: { phone, roleId },
      include: { all: true },
    });

    return user;
  }

  getByPhone(phone: number): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
      include: { all: true },
    });
  }
}
