import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @ApiProperty()
  @IsMongoId()
  id: string;
}
