import { Module } from '@nestjs/common';
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { HealthCheckController } from "@/shared/health/health-check.controller";

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthCheckController],
  exports: []
})

export class HealthModule { }
