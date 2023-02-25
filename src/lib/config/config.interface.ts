import { ConfigType } from "@nestjs/config";
import { database, jwt } from "./configs";
import { app } from "./configs/app.config";

export interface IConfig {
	app: ConfigType<typeof app>;
	jwt: ConfigType<typeof jwt>;
	database: ConfigType<typeof database>;
}
