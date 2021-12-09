import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'SUPER_ADMIN', description: "Role's text value" })
  readonly value: string;
  @ApiProperty({
    example: 'Role with super right',
    description: "Role's description",
  })
  readonly description: string;
  @ApiProperty({ example: 1, description: "Role's weight" })
  readonly weight: number;
}
