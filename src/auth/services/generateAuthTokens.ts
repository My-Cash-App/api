import { User } from '../../users/users.model';
import { IGenerateTokens } from '../../interfaces/IGenerateTokens';

export function generateAuthTokens(user: User): IGenerateTokens {
  const payload = { phone: user.phone, role: user.role.value, id: user.id };
  const accessToken = this.jwtService.sign(payload);
  const refreshToken = this.jwtService.sign(payload, {
    secret: process.env.REFRESH_PRIVATE_KEY || 'REFRESH_PRIVATE_KEY',
    expiresIn: '30d',
  });
  return { accessToken, refreshToken };
}
