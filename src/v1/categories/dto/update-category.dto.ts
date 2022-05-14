import { PartialType } from "@nestjs/swagger";
import { createCategoryDto } from "@/v1/categories/dto/create-category.dto";

export class updateCategoryDto extends PartialType(createCategoryDto) {}
