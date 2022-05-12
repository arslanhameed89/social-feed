import {Global, Module} from '@nestjs/common';
import { ProvidersModule } from '@/providers/providers.module';
import { CustomerController } from '@/v1/customer/customer.controller';
import { CustomerService } from '@/v1/customer/services/customer.service';
import { CustomerProviders } from '@/v1/customer/providers/customer.providers';
import { CustomerRepository } from '@/v1/customer/repository/customer.repository';
import { CoreModule } from '@/core/core.module';

@Global()
@Module({
  imports: [
    ProvidersModule, 
    CoreModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, ...CustomerProviders],
  exports: [...CustomerProviders,CustomerService,CustomerRepository]
})
export class CustomerModule { }
