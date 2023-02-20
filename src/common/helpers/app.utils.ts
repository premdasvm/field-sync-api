import { IConfig } from "@lib/config/configs/config.interface";
import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { getMiddleware } from "swagger-stats";

export const AppUtils = {
	setupSwagger: (app: INestApplication, configService: ConfigService<IConfig, true>): void => {
		const userName = configService.get("app.swaggerUser", { infer: true });
		const passWord = configService.get("app.swaggerPass", { infer: true });
		const appName = configService.get("app.name", { infer: true });

		const options = new DocumentBuilder()
			.setTitle(`${appName} API Documentation`)
			.setDescription(`The API Documentation for ${appName}.`)
			.setVersion("1.0")
			.addBearerAuth({
				type: "http",
				scheme: "Bearer",
				bearerFormat: "JWT",
				name: "JWT",
				description: "Enter JWT token",
				in: "header",
			})
			.build();

		const document = SwaggerModule.createDocument(app, options, {});

		app.use(
			getMiddleware({
				swaggerSpec: document,
				authentication: true,
				hostname: appName,
				uriPath: "/stats",
				onAuthenticate: (_request: any, username: string, password: string) => {
					// simple check for username and password
					return username === userName && password === passWord;
				},
			}),
		);

		SwaggerModule.setup("doc", app, document, {
			explorer: true,
			swaggerOptions: {
				docExpansion: "list",
				filter: true,
				showRequestDuration: true,
				persistAuthorization: true,
			},
			customSiteTitle: `${appName} API Documentation`,
		});
	},
};
