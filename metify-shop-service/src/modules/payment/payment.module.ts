import { Module } from '@nestjs/common';

import { PaymentController } from '@/modules/payment/payment.controller';

import { PaymentService } from '@/modules/payment/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
