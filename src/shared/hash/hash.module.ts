import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HashService } from "@/shared/hash/hash.service";

@Module({
  imports: [ConfigModule],
  providers: [HashService],
  exports: [HashService],
})
export class HashModule {}
