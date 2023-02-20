import { NestConfigModule } from "@lib/config/config.module";
import { IConfig } from "@lib/config/config.interface";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [NestConfigModule],
			useFactory: async (configService: ConfigService<IConfig, true>) => ({
				isGlobal: true,
				secret: configService.get("jwt.secret", { infer: true }),
				signOptions: {
					expiresIn: configService.get("jwt.accessExpiry", { infer: true }),
					algorithm: "HS256",
				},
			}),
			inject: [ConfigService],
		}),
	],
	exports: [JwtModule],
})
export class NestJwtModule {}
