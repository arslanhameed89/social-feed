import {Global, Module} from '@nestjs/common';
import { ProvidersModule } from '@/providers/providers.module';
import { UserController } from '@/v1/user/user.controller';
import { UserProviders } from '@/v1/user/providers/user.providers';
import { CoreModule } from '@/core/core.module';
import { UserService } from "@/v1/user/services/user.service";
import { UserRepository } from "@/v1/user/repository/user.repository";
import { HashModule } from "@/shared/hash/hash.module";

@Global()
@Module({
  imports: [
    ProvidersModule, 
    CoreModule,
    HashModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, ...UserProviders],
  exports: [...UserProviders, UserService, UserRepository]
})
export class UserModule { }
