import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class createCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
    name: string

  @IsNotEmpty()
  @ApiProperty()
    description: string

  @IsNotEmpty()
  @ApiProperty({ default: true })
    status?: number = 1

  @IsNotEmpty()
  @ApiProperty({ default: 'Active' })
    statusMsg?: string = 'Active'
}
