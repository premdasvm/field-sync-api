import { SharedModule } from "@modules/shared/shared.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [SharedModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
