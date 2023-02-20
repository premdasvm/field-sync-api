import { NestJwtModule } from "@lib/jwt/jwt.module";
import { TokenService } from "@modules/token/token.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
	imports: [PassportModule, NestJwtModule],
	controllers: [AuthController],
	providers: [AuthService, TokenService, JwtStrategy],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
