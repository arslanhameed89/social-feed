import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { coordinates } from '@/v1/user/schemas/user.schema'
import { Transform, Type } from 'class-transformer'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    password: string

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
    mobile: number

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
    email: string

  @ApiProperty()
    emailVerified: string

  @ApiProperty({ type: coordinates })
    coordinates: coordinates

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    dateOfBirth: string

  @ApiProperty()
    profilePic: string

  @ApiProperty({ default: true })
  @IsNotEmpty()
    status?: number = 1

  @IsNotEmpty()
  @ApiProperty({ default: true })
    statusMsg?: string = 'Active'
}
