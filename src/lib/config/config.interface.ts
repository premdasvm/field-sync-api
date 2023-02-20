import { ConfigType } from "@nestjs/config";
import { jwt } from "./configs";
import { app } from "./configs/app.config";

export interface IConfig {
	app: ConfigType<typeof app>;
	jwt: ConfigType<typeof jwt>;
}
