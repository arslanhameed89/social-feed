import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class ObtainPostDto {

  @ApiProperty({ default: 'desc' })
  @IsNotEmpty()
  sort?: string = 'desc';

  //date | tag
  @ApiProperty()
  filterBy?: string;

  @ApiProperty()
  filterKey?: string;
}
