import { Module } from '@nestjs/common';
import { CustomerModule } from '@/v1/customer/customer.module';

@Module({
  imports: [CustomerModule],
  providers: [],
  exports: [],
})
export class V1Module {}
