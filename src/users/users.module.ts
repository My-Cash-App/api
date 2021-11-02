import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { AuthModule } from '../auth/auth.module';
import { RolesService } from '../roles/roles.service';
import { RefreshToken } from '../auth/models/refresh-tokens.model';

@Module({
  providers: [UsersService, RolesService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Role, RefreshToken]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
