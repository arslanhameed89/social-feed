import { Module } from '@nestjs/common';
import { CustomerModule } from '@/v1/customer/customer.module';
import { CategoriesModule } from "@/v1/categories/categories.module";

@Module({
  imports: [CustomerModule, CategoriesModule],
  providers: [],
  exports: [],
})
export class V1Module {}
