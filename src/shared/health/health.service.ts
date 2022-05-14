import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";
import * as mongoose from "mongoose";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HealthService extends HealthIndicator {

  constructor(
    private readonly configService: ConfigService
  ) {
    super();
  }

  async isDbHealthy(key: string): Promise<HealthIndicatorResult> {
    let isHealthy: boolean;
    let connection: mongoose.Mongoose;
    try {
      const url = this.configService.get<string>('APP.DB.MONGODB_URL')
      connection = await mongoose.connect(url);

      isHealthy = true;
    } catch (err) {
      isHealthy = false;
    }

    const result = this.getStatus(key, isHealthy, {});

    if (isHealthy) {
      if (connection) await connection.disconnect();
      return result;
    }
  }
}
