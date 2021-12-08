import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLE_WEIGHT_KEY } from '../roles-auth.decorator';
import { RolesService } from '../../roles/roles.service';
import { checkAccessToken } from '../helpers/checkAccessToken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private rolesService: RolesService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoleWeight = this.reflector.getAllAndOverride(
        ROLE_WEIGHT_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (!requiredRoleWeight) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const user = checkAccessToken.call(this, req.headers.authorization);

      const role = await this.rolesService.getByValue(user.role);

      if (role.weight > requiredRoleWeight) {
        return true;
      }
    } catch (e) {
      throw new ForbiddenException('Нет доступа!');
    }

    throw new ForbiddenException('Нет доступа!');
  }
}
