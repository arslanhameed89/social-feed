import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty()
  @IsNotEmpty()
  pushToken: string;

  @ApiProperty()
  @IsNotEmpty()
  appVersion: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceMake: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceModel: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceType: string;

  @ApiProperty()
  @IsNotEmpty()
  deviceTime: string;

  @ApiProperty()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty()
  deviceOsVersion: string;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;
}
