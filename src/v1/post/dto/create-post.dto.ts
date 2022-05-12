import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

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
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  category: string;
  @ApiProperty()
  @IsNotEmpty()
  tags: [];

  @ApiProperty()
  likes: [];

  @ApiProperty()
  likesCount: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  statusMsg: string;

}
