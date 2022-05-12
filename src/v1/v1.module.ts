import { Module } from '@nestjs/common';
import { CustomerModule } from '@/v1/customer/customer.module';
import { CategoriesModule } from "@/v1/categories/categories.module";
import { PostModule } from "@/v1/post/post.module";

@Module({
  imports: [CustomerModule, CategoriesModule, PostModule],
  providers: [],
  exports: [],
})
export class V1Module {}
