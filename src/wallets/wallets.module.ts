import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './wallets.model';
import { Transaction } from '../transactions/transactions.model';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [SequelizeModule.forFeature([Wallet, Transaction])],
})
export class WalletsModule {}
