import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleWeight } from '../auth/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @UseGuards(JwtAuthGuard)
  @RoleWeight(0)
  @UseGuards(RolesGuard)
  @Get('/')
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @UseGuards(JwtAuthGuard)
  @RoleWeight(0)
  @UseGuards(RolesGuard)
  @Post('/')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @UseGuards(JwtAuthGuard)
  @RoleWeight(5)
  @UseGuards(RolesGuard)
  @Get('/profile')
  getProfile(@Param('id') id: number): Promise<User> {
    return this.usersService.getProfile(id);
  }
}
