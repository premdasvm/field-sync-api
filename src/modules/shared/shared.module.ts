import { NestConfigModule } from "@lib/index";
import { NestJwtModule } from "@lib/jwt/jwt.module";
import { AuthModule } from "@modules/auth/auth.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [NestConfigModule, NestJwtModule, AuthModule],
})
export class SharedModule {}
