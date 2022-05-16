import { Module } from "@nestjs/common";
import { UserModule } from "@/v1/user/user.module";
import { CategoriesModule } from "@/v1/categories/categories.module";
import { PostModule } from "@/v1/post/post.module";

@Module({
  imports: [UserModule, CategoriesModule, PostModule],
  providers: [],
  exports: [],
})
export class V1Module {}
