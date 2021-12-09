import { ApiProperty } from '@nestjs/swagger';

export class GetCodeDto {
  @ApiProperty({ example: 79529139340, description: "User's phone" })
  readonly phone: number;
}

export class CheckCodeDto extends GetCodeDto {
  @ApiProperty({ example: 4444, description: 'Auth code' })
  readonly code: number;
}
