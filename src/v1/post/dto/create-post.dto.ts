import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
    author: string

  @ApiProperty()
  @IsNotEmpty()
    title: string

  @ApiProperty()
  @IsNotEmpty()
    content: string

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
    category: string

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
    tags: string[]

  @ApiProperty()
    image: string

  @ApiProperty()
    likes: []

  @ApiProperty()
    likesCount: number

  @ApiProperty()
    status: number

  @ApiProperty()
    statusMsg: string
}
