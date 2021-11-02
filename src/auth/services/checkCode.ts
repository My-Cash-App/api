import { CheckCodeDto } from '../dto/auth.dto';
import { IGenerateTokens } from '../../interfaces/IGenerateTokens';
import { HttpException, HttpStatus } from '@nestjs/common';
import { add } from 'date-fns';

export async function checkCode(
  checkCodeDto: CheckCodeDto,
): Promise<IGenerateTokens> {
  const { phone, code } = checkCodeDto;

  const user = await this.userRepository.findOne({
    where: { phone },
    include: { all: true },
  });

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
