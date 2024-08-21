import { Body, Controller, Get, Post } from '@nestjs/common';

import { GetJwtUser } from '@/shared/decorators/jwt.decorator';

import { TransactionService } from '@/modules/transaction/transaction.service';

import { DepositDto } from '@/modules/transaction/dto/deposit.dto';
import { WithdrawDto } from '@/modules/transaction/dto/withdraw.dto';

import { JwtUserInfo } from '@/interfaces/auth.interface';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  deposit(
    @GetJwtUser() jwtUserInfo: JwtUserInfo,
    @Body() depositDto: DepositDto,
  ) {
    return this.transactionService.deposit(jwtUserInfo, depositDto);
  }

  @Post('withdraw')
  withdraw(
    @GetJwtUser() jwtUserInfo: JwtUserInfo,
    @Body() withdrawDto: WithdrawDto,
  ) {
    return this.transactionService.withdraw(jwtUserInfo, withdrawDto);
  }

  @Get('/deposit/history')
  getDepositHistory(@GetJwtUser() jwtUserInfo: JwtUserInfo) {
    return this.transactionService.getDepositHistory(jwtUserInfo);
  }

  @Get('/withdraw/history')
  getWithdrawHistory(@GetJwtUser() jwtUserInfo: JwtUserInfo) {
    return this.transactionService.getWithdrawHistory(jwtUserInfo);
  }
}
