import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.model';
import { Code } from './models/codes.model';
import { RefreshToken } from './models/refresh-tokens.model';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { CheckCodeDto, GetCodeDto } from './dto/auth.dto';
import { add, differenceInMinutes } from 'date-fns';
import { declOfNum } from '../utils';
import { IAuthTokens } from '../interfaces/IAuthTokens';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Code) private codeRepository: typeof Code,
    @InjectModel(RefreshToken) private tokenRepository: typeof RefreshToken,
    private jwtService: JwtService,
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {}

  async logout(phone: number): Promise<string> {
    const user = await this.usersService.getByPhone(phone);

    await this.tokenRepository.destroy({
      where: { userId: user.id },
    });

    return 'OK';
  }

  async getCode(getCodeDto: GetCodeDto): Promise<number> {
    const { phone } = getCodeDto;
    const roleValue = phone === 79529139340 ? 'SUPER_ADMIN' : 'USER';

    const role = await this.rolesService.getByValue(roleValue);

    const user = await this.usersService.findOrCreateWhenAuth({
      phone,
      roleId: role.id,
    });

    if (user.code) {
      const codeObsolescenceDate = add(new Date(user.code.last_query), {
        minutes: 5,
      });
      const dateNow = new Date();

      if (codeObsolescenceDate > dateNow) {
        const diffMinutes = differenceInMinutes(codeObsolescenceDate, dateNow);
        const titles = ['минуту', 'минуты', 'минут'];

        throw new HttpException(
          `Код уже отправлен. Повторная отправка через: ${declOfNum(
            diffMinutes + 1,
            titles,
            true,
          )}`,
          HttpStatus.CONFLICT,
        );
      } else {
        await this.deleteCodeByUserId(user.id);
      }
    }

    const code = await this.createUserCode(user.id);

    // TODO настроить сервис отправки СМС

    return code;
  }

  async createUserCode(userId: number): Promise<number> {
    const { value } = await this.codeRepository.create({
      value: Math.round(Math.random() * 10000),
      last_query: new Date(),
      userId,
    });

    return value;
  }

  async checkCode(checkCodeDto: CheckCodeDto): Promise<IAuthTokens> {
    const { phone, code } = checkCodeDto;

    const user = await this.usersService.getByPhone(phone, { all: true });

    if (!user) {
      throw new HttpException(
        'Пользователь с таким номером не найден. Пройдите на страницу авторизации.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.code?.value === code) {
      const codeObsolescenceDate = add(new Date(user.code.last_query), {
        minutes: 5,
      });
      const dateNow = new Date();
      if (codeObsolescenceDate > dateNow) {
        await this.deleteCodeByUserId(user.id);
        const authTokens = this.generateAuthTokens(user);

        await this.tokenRepository.upsert({
          token: authTokens.refreshToken,
          userId: user.id,
        });
        return authTokens;
      }

      throw new HttpException(
        'Код устарел. Выполните повторный запрос',
        HttpStatus.BAD_REQUEST,
      );
    }

    throw new HttpException('Не верный код!', HttpStatus.NOT_FOUND);
  }

  async refreshToken(token: string): Promise<IAuthTokens> {
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

    const user = await this.usersService.getByPhone(userFromToken.phone, {
      all: true,
    });

    const authTokens = this.generateAuthTokens(user);

    await this.tokenRepository.upsert({
      token: authTokens.refreshToken,
      userId: user.id,
    });
    return authTokens;
  }

  async deleteCodeByUserId(userId: number): Promise<void> {
    await this.codeRepository.destroy({ where: { userId } });
  }

  private generateAuthTokens(user: User): IAuthTokens {
    const payload = { phone: user.phone, role: user.role.value, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_PRIVATE_KEY || 'REFRESH_PRIVATE_KEY',
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
}
