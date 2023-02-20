import { ConfigType } from "@nestjs/config";
import { app } from "./app.config";

export interface IConfig {
	app: ConfigType<typeof app>;
}
