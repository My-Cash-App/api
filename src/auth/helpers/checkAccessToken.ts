import { UnauthorizedException } from '@nestjs/common';
import { IDataFromToken } from '../../interfaces/IDataFromToken';

export function checkAccessToken(authHeader: string): IDataFromToken {
  const authHeaderArr = authHeader?.split(' ');
  const bearer = authHeaderArr[0];
  const token = authHeaderArr[1];

  if (bearer !== 'Bearer' && !token) {
    throw new UnauthorizedException({
      message: 'Пользователь не авторизован',
    });
  }

  return this.jwtService.verify(token);
}
