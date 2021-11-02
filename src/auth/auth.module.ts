import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Code } from './models/codes.model';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { RefreshToken } from './models/refresh-tokens.model';

@Module({
  providers: [AuthService, UsersService, RolesService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'PRIVATE_KEY',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    SequelizeModule.forFeature([Code, User, Role, RefreshToken]),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
