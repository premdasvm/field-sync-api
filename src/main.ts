import { AppUtils } from "@common/helpers";
import { IConfig } from "@lib/config/config.interface";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService<IConfig, true>);
	const logger = new Logger("Bootstrap");

	// =====================================================
	// configureNestGlobals
	// =====================================================

	const globalPrefix = configService.get("app.prefix", { infer: true });

	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix(globalPrefix);

	// =========================================================
	// configureNestSwagger
	// =========================================================

	AppUtils.setupSwagger(app, configService);

	const port = 3000;

	await app.listen(port);

	logger.debug(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
	logger.debug(`🚀 Swagger is running on: http://localhost:${port}/${globalPrefix}/doc`);
	logger.debug(`🚀 Stats is running on: http://localhost:${port}/${globalPrefix}/stats`);
}
bootstrap();
