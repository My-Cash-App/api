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

  async getProfile(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async findOrCreateWhenAuth(
    findOrCreateWhenAuthDto: FindOrCreateWhenAuthDto,
  ): Promise<User> {
    const [user] = await this.userRepository.findOrCreate({
      where: findOrCreateWhenAuthDto,
      include: { all: true },
    });

    return user;
  }

  getByPhone(phone: number, include = {}): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
      include,
    });
  }
}
