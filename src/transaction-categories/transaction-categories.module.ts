import { forwardRef, Module } from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { TransactionCategoriesController } from './transaction-categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { AuthModule } from '../auth/auth.module';
import { TransactionSubCategory } from './transaction-sub-categories.model';
import { TransactionCategory } from './transaction-categories.model';

@Module({
  providers: [TransactionCategoriesService],
  controllers: [TransactionCategoriesController],
  imports: [
    SequelizeModule.forFeature([
      User,
      TransactionCategory,
      TransactionSubCategory,
    ]),
    forwardRef(() => AuthModule),
  ],
})
export class TransactionCategoriesModule {}
