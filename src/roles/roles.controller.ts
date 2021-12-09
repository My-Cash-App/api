import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleWeight } from '../auth/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @UseGuards(JwtAuthGuard)
  @RoleWeight(0)
  @UseGuards(RolesGuard)
  @Post('/')
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(createRoleDto);
  }
}
