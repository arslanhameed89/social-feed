import { Module } from "@nestjs/common";
import { ProvidersModule } from "@/providers/providers.module";
import { CategoriesController } from "@/v1/categories/categories.controller";
import { CategoryProviders } from "@/v1/categories/providers/category.providers";
import { CategoryService } from "@/v1/categories/services/category.service";
import { CategoryRepository } from "@/v1/categories/repository/category.repository";

@Module({
  imports: [ProvidersModule],
  controllers: [CategoriesController],
  providers: [CategoryService, CategoryRepository, ...CategoryProviders],
  exports: [...CategoryProviders, CategoryRepository],
})
export class CategoriesModule {}
