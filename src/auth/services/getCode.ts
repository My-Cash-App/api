import { GetCodeDto } from '../dto/auth.dto';
import { add, differenceInMinutes } from 'date-fns';
import { HttpException, HttpStatus } from '@nestjs/common';
import { declOfNum } from '../../utils';

export async function getCode(getCodeDto: GetCodeDto): Promise<number> {
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

  const code = await createUserCode.call(this, user.id);

  // TODO настроить сервис отправки СМС

  return code;
}

async function createUserCode(userId: number): Promise<number> {
  const { value } = await this.codeRepository.create({
    value: Math.round(Math.random() * 10000),
    last_query: new Date(),
    userId,
  });

  return value;
}
