import { JwtAuthGuard } from "@common/guards/jwt.guard";
import { SharedModule } from "@modules/shared/shared.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

@Module({
	imports: [SharedModule],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
