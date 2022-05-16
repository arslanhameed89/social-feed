import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hashSync, compareSync } from "bcrypt";

@Injectable()
export class HashService {
  saltRounds: number;

  constructor(private configService: ConfigService) {
    this.saltRounds = this.configService.get<number>("APP.SALT_ROUND");
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return hashSync(password, this.saltRounds);
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
      return compareSync(password, dbPassword);
    } catch (err) {
      console.info(err);
      throw err;
    }
  }
}
