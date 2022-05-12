import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from "./config/app.config";
import { ConfigModule } from "@nestjs/config";
import { ProvidersModule } from "./providers/providers.module";
import { CoreModule } from "@/core/core.module";
import { V1Module } from "@/v1/v1.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    ProvidersModule,
    CoreModule,
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
