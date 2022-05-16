import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from "@nestjs/terminus";
import { ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { HealthService } from "@/shared/health/health.service";

@Controller("health")
@ApiTags("health")
export class HealthCheckController {
  private readonly url: string;
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MongooseHealthIndicator,
    private readonly configService: ConfigService,
    private readonly healthService: HealthService
  ) {
    this.url = `${this.configService.get<string>("APP.SERVER")} / 
                ${this.configService.get<string>("APP.API_GLOBAL_PREFIX")} 
                `;
  }

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () => this.http.pingCheck("Basic Check", this.url.replace(/\s/g, "")),
      () => this.healthService.isDbHealthy("mongoose"),
    ]);
  }
}
