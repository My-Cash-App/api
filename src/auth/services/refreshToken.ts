import { UnauthorizedException } from '@nestjs/common';
import { IGenerateTokens } from '../../interfaces/IGenerateTokens';

export async function refreshToken(token: string): Promise<IGenerateTokens> {
  let userFromToken;
  try {
    userFromToken = this.jwtService.verify(token, {
      secret: process.env.REFRESH_PRIVATE_KEY || 'REFRESH_PRIVATE_KEY',
    });
  } catch (e) {
    throw new UnauthorizedException({
      message: 'Пользователь не авторизован',
    });
  }

  const checkRefresh = this.tokenRepository.findOne({
    where: { token, userId: userFromToken.id },
  });

  if (!checkRefresh) {
    throw new UnauthorizedException({
      message: 'Пользователь не авторизован',
    });
  }

  const user = await this.usersService.getByPhone(userFromToken.phone);

  const authTokens = this.generateAuthTokens(user);

  await this.tokenRepository.upsert({
    token: authTokens.refreshToken,
    userId: user.id,
  });
  return authTokens;
}
