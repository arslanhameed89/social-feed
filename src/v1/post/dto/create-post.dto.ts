import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreatePostDto {

  @ApiProperty()
  @IsNotEmpty()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  category: string;

  @ApiProperty()
  @IsNotEmpty()
  tags: [];

  @ApiProperty()
  image: string;

  @ApiProperty()
  likes: [];

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  statusMsg: string;

}
