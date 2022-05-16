import { Connection } from "mongoose";
import { UserSchema } from "../schemas/user.schema";

export const UserProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (connection: Connection): any => {
      if (!connection) return;
      return connection.model("user", UserSchema, "users");
    },
    inject: ["MONGODB_PROVIDER"],
  },
];
