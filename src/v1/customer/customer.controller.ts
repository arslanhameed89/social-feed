import { Body, Controller, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CustomerService } from './services/customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './schemas/customer.schema';
import { diskStorage } from 'multer'
import { Request } from 'express';
import { IFile } from "@/core/interfaces";
import { ApiFile } from "@/core/decorators/api-file/api-file-decorator";
import { fileMimetypeFilter } from "@/shared/helpers/file-mime-type-filter";
import { UploadRequestBody } from "@/v1/customer/swagger/upload-request-body";
import { randomUUID } from "crypto";

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  /**
   * @param createCustomerDto
   * @param file
   */
  @Post()
  @ApiFile('profilePic', true, UploadRequestBody, {
    storage: diskStorage({
      destination: './uploads-tmp',
      filename: (req: Request, file: IFile, callback: (error: Error | null, filename: string) => void) => {
        callback(null, `${randomUUID()} - ${file.originalname}`);
      }
    }),
    fileFilter: fileMimetypeFilter('image')
  })
  create(@Body() createCustomerDto: CreateCustomerDto, @UploadedFile() file: Express.Multer.File): Promise<Customer> {
    return this.customerService.create(createCustomerDto, file);
  }

  @Patch(':id')
  @ApiFile('profilePic', true, UploadRequestBody, {
    storage: diskStorage({
      destination: './uploads-tmp',
      filename: (req: Request, file: IFile, callback: (error: Error | null, filename: string) => void) => {
        callback(null, `${randomUUID()} - ${file.originalname}`);
      }
    }),
    fileFilter: fileMimetypeFilter('image')
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.customerService.update(id, updateCustomerDto, file);
  }

}
