import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";
import { coordinates } from '@/v1/customer/schemas/customer.schema';


export class CreateCustomerDto {

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  emailVerified: string;

  @ApiProperty({ type: coordinates })
  coordinates: coordinates;

  @ApiProperty()
  dateOfBirth: string;

  @ApiProperty()
  profilePic: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  statusMsg: string;

}
