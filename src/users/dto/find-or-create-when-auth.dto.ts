import { ApiProperty } from '@nestjs/swagger';

export class FindOrCreateWhenAuthDto {
  @ApiProperty({ example: 79529139340, description: "User's phone number" })
  readonly phone: number;
  @ApiProperty({ example: 1, description: "Role's id" })
  readonly roleId: number;
}
