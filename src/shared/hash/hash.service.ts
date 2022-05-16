import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HashService {
  saltRounds: number;

  constructor(private configService: ConfigService) {
    this.saltRounds = this.configService.get<number>("APP.SALT_ROUND");
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (err) {
      console.info(err);
      throw err;
    }
  }

  async comparePassword(
    password: string,
    dbPassword: string
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, dbPassword);
    } catch (err) {
      console.info(err);
      throw err;
    }
  }
}
