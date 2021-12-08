import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { Code } from './auth/models/codes.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { RefreshToken } from './auth/models/refresh-tokens.model';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionCategoriesModule } from './transaction-categories/transaction-categories.module';
import { TransactionSubCategory } from './transaction-categories/transaction-sub-categories.model';
import { Wallet } from './wallets/wallets.model';
import { Transaction } from './transactions/transactions.model';
import { TransactionCategory } from './transaction-categories/transaction-categories.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Code,
        Role,
        Wallet,
        Transaction,
        RefreshToken,
        TransactionCategory,
        TransactionSubCategory,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    WalletsModule,
    TransactionsModule,
    TransactionCategoriesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
