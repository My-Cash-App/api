export class GetCodeDto {
  readonly phone: number;
}

export class CheckCodeDto extends GetCodeDto {
  readonly code: number;
}
