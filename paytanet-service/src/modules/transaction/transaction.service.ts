import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { DepositRepository } from '@/models/deposit/repositories/deposit.repository';

import { DepositStatus } from '@/models/deposit/entities/deposit.entity';
import { WithdrawStatus } from '@/models/withdraw/entities/withdraw.entity';

import { UserRepository } from '@/models/user/repositories/user.repository';
import { CurrencyRepository } from '@/models/currency/repositories/currency.repository';
import { WithdrawRepository } from '@/models/withdraw/repositories/withdraw.repository';
import { UserWalletRepository } from '@/models/user/repositories/user-wallet.repository';

import { UserWalletService } from '@/modules/user-wallet/user-wallet.service';

import { DepositDto } from '@/modules/transaction/dto/deposit.dto';
import { WithdrawDto } from '@/modules/transaction/dto/withdraw.dto';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectEntityManager()
    private readonly entityManage: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly userWalletRepository: UserWalletRepository,
    private readonly currencyRepository: CurrencyRepository,
    private readonly depositRepository: DepositRepository,
    private readonly withdrawRepository: WithdrawRepository,
    private readonly userWalletService: UserWalletService,
  ) {}

  async deposit(jwtUserInfo: JwtUserInfo, depositDto: DepositDto) {
    const { id: userId } = jwtUserInfo;

    try {
      const { amount, currencyCode, note } = depositDto;

      const foundUser = await this.userRepository.findOneById(userId);

      if (!foundUser) {
        throw new BadRequestException('User not found');
      }

      const currency =
        await this.currencyRepository.findOneByCode(currencyCode);

      if (!currency) {
        throw new BadRequestException('Currency not found');
      }

      const userWallet = foundUser.userWallets.find(
        (wallet) => wallet.currency.id === currency.id,
      );

      const { userWalletResult } = await this.entityManage.transaction(
        async (txManager) => {
          const depositData = await this.depositRepository.create({
            amount,
            note: note || '',
            status: DepositStatus.SUCCESS,
            userWallet: userWallet,
          });

          const depositResult = await this.depositRepository.saveWithTxManager(
            depositData,
            txManager,
          );

          userWallet.balance = Number(userWallet.balance) + amount;

          const userWalletResult =
            await this.userWalletRepository.saveWithTxManager(
              userWallet,
              txManager,
            );

          return { depositResult, userWalletResult };
        },
      );

      try {
        await this.userWalletService.getMyWallets(jwtUserInfo);
        this.logger.log(
          `[Deposit] - Successfully save user wallet to cache of ${foundUser.userAuth.username}`,
        );
      } catch (error) {
        this.logger.error(
          `[Deposit] -  Error when save user wallet to cache of ${foundUser.userAuth.username}: ${error.message}`,
        );
      }

      return {
        message: `Successfully deposited ${amount} ${currency.currencyCode}.`,
        balance: userWalletResult.balance,
        currencyCode: currency.currencyCode,
      };
    } catch (error) {
      throw error;
    }
  }

  async withdraw(jwtUserInfo: JwtUserInfo, withdrawDto: WithdrawDto) {
    const { id: userId } = jwtUserInfo;

    try {
      const { amount, currencyCode, note } = withdrawDto;

      const foundUser = await this.userRepository.findOneById(userId);

      if (!foundUser) {
        throw new BadRequestException('User not found');
      }

      const currency =
        await this.currencyRepository.findOneByCode(currencyCode);

      if (!currency) {
        throw new BadRequestException('Currency not found');
      }

      const userWallet = foundUser.userWallets.find(
        (wallet) => wallet.currency.id === currency.id,
      );

      if (Number(userWallet.balance) < amount) {
        throw new BadRequestException('Insufficient balance');
      }

      const { userWalletResult } = await this.entityManage.transaction(
        async (txManager) => {
          const withdrawData = await this.withdrawRepository.create({
            amount,
            note: note || '',
            status: WithdrawStatus.SUCCESS,
            userWallet: userWallet,
          });

          const withdrawResult =
            await this.withdrawRepository.saveWithTxManager(
              withdrawData,
              txManager,
            );

          userWallet.balance = Number(userWallet.balance) - amount;

          const userWalletResult =
            await this.userWalletRepository.saveWithTxManager(
              userWallet,
              txManager,
            );

          return { withdrawResult, userWalletResult };
        },
      );

      try {
        await this.userWalletService.getMyWallets(jwtUserInfo);
        this.logger.log(
          `[Deposit] - Successfully save user wallet to cache of ${foundUser.userAuth.username}`,
        );
      } catch (error) {
        this.logger.error(
          `[Withdraw] -  Error when save user wallet to cache of ${foundUser.userAuth.username}: ${error.message}`,
        );
      }

      return {
        message: `Successfully withdraw ${amount} ${currency.currencyCode} `,
        balance: userWalletResult.balance,
        currencyCode: currency.currencyCode,
      };
    } catch (error) {
      throw error;
    }
  }

  async getDepositHistory(jwtUserInfo: JwtUserInfo) {
    const { id: userId } = jwtUserInfo;

    const depositHistory = await this.depositRepository
      .createQueryBuilder('deposit')
      .leftJoinAndSelect('deposit.userWallet', 'userWallet')
      .leftJoinAndSelect('userWallet.user', 'user')
      .leftJoinAndSelect('userWallet.currency', 'currency')
      .select(['deposit', 'userWallet.id', 'currency'])
      .orderBy('deposit.createdAt', 'DESC')
      .where('user.id = :userId', { userId })
      .take(20)
      .getMany();

    return depositHistory;
  }

  async getWithdrawHistory(jwtUserInfo: JwtUserInfo) {
    const { id: userId } = jwtUserInfo;

    const withdrawHistory = await this.withdrawRepository
      .createQueryBuilder('withdraw')
      .leftJoinAndSelect('withdraw.userWallet', 'userWallet')
      .leftJoinAndSelect('userWallet.user', 'user')
      .leftJoinAndSelect('userWallet.currency', 'currency')
      .select(['withdraw', 'userWallet.id', 'currency'])
      .orderBy('withdraw.createdAt', 'DESC')
      .where('user.id = :userId', { userId })
      .take(20)
      .getMany();

    return withdrawHistory;
  }
}
