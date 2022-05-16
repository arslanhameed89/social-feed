import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./services/user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { diskStorage } from "multer";
import { Request } from "express";
import { IFile } from "@/core/interfaces";
import { ApiFile } from "@/core/decorators/api-file/api-file-decorator";
import { fileMimetypeFilter } from "@/shared/helpers/file-mime-type-filter";
import { UploadRequestBody } from "@/v1/user/swagger/upload-request-body";
import { randomUUID } from "crypto";
import { Category } from "@/v1/categories/schemas/category.schema";

@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * @param createCustomerDto
   * @param file
   */
  @Post()
  @ApiFile("profilePic", true, UploadRequestBody, {
    storage: diskStorage({
      destination: "./uploads-tmp",
      filename: (
        req: Request,
        file: IFile,
        callback: (error: Error | null, filename: string) => void
      ) => {
        callback(null, `${randomUUID()} - ${file.originalname}`);
      },
    }),
    fileFilter: fileMimetypeFilter("image"),
  })
  create(
    @Body() createCustomerDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<User> {
    return this.userService.create(createCustomerDto, file);
  }

  /**
   *
   * @param id
   * @param updateCustomerDto
   * @param file
   */
  @Patch(":id")
  @ApiFile("profilePic", true, UploadRequestBody, {
    storage: diskStorage({
      destination: "./uploads-tmp",
      filename: (
        req: Request,
        file: IFile,
        callback: (error: Error | null, filename: string) => void
      ) => {
        callback(null, `${randomUUID()} - ${file.originalname}`);
      },
    }),
    fileFilter: fileMimetypeFilter("image"),
  })
  update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.userService.update(id, updateCustomerDto, file);
  }

  /**
   *
   * @param id
   */
  @Get("/:id")
  async findOne(@Param("id") id: string): Promise<Category> {
    return await this.userService.fineOne(id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
