import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CheckCodeDto, GetCodeDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/get-code')
  getCode(@Body() getCodeDto: GetCodeDto): Promise<number> {
    return this.authService.getCode(getCodeDto);
  }

  @Post('/check-code')
  async checkCode(
    @Body() checkCodeDto: CheckCodeDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { accessToken, refreshToken } = await this.authService.checkCode(
      checkCodeDto,
    );
    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 5184000000),
      httpOnly: true,
    });
    return res.send({ token: accessToken });
  }

  @Post('/logout')
  logout(@Body('phone') phone: number): Promise<string> {
    return this.authService.logout(phone);
  }

  @Get('/refresh')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const { refreshToken, accessToken } = await this.authService.refreshToken(
      req.cookies.refreshToken,
    );
    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 5184000000),
      httpOnly: true,
    });
    return res.send({ token: accessToken });
  }
}
