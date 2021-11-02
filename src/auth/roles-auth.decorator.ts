import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const ROLE_WEIGHT_KEY = 'roleWeight';

export const RoleWeight = (weight: number): CustomDecorator =>
  SetMetadata(ROLE_WEIGHT_KEY, weight);
