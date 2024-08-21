import { Body, Controller, Post } from '@nestjs/common';

import { GetJwtToken, GetJwtUser } from '@/shared/decorators/jwt.decorator';

import { JwtUserInfo } from '@/interfaces/auth.interface';

import { PaymentService } from '@/modules/payment/payment.service';

import { PayDto } from '@/modules/payment/dto/pay.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/pay')
  pay(
    @GetJwtToken() accessToken: string,
    @GetJwtUser() jwtUserInfo: JwtUserInfo,
    @Body() payDto: PayDto,
  ) {
    return this.paymentService.pay(accessToken, jwtUserInfo, payDto);
  }
}
