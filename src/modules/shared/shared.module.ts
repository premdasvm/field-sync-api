import { NestConfigModule } from "@lib/index";
import { Module } from "@nestjs/common";

@Module({
	imports: [NestConfigModule],
})
export class SharedModule {}
