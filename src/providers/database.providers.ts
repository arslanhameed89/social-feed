import * as mongoose from "mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const databaseProviders = [
  {
    provide: "MONGODB_PROVIDER",
    imports: [ConfigModule],
    useFactory: async (
      configService: ConfigService
    ): Promise<typeof mongoose> => {
      let connection: mongoose.Mongoose = null;
      //let retryCount = 0;
      do {
        try {
          connection = await mongoose.connect(
            configService.get<string>("APP.DB.MONGODB_URL")
          );
          console.info(`connection has been made on first part`);
        } catch (err) {
          console.info(err);
          //retryCount++;
          //@TODO: add Logger
        }
      } while (connection === null);

      mongoose.connection.on("connected", () => {
        //@TODO: add Logger
        console.info("connection has been made");
      });

      mongoose.connection.on("reconnected", () => {
        //@TODO: add Logger
        console.info("mongo reconnected");
      });

      mongoose.connection.on("disconnected", async () => {
        connection = await mongoose.connect(
          configService.get<string>("APP.DB.MONGODB_URL")
        );
      });

      mongoose.connection.on("close", () => {
        //@TODO: add Logger;
      });

      mongoose.connection.on("error", () => {
        //@TODO: add Logger
      });

      return connection;
    },
    inject: [ConfigService],
  },
];
