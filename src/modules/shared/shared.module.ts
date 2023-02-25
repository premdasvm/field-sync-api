import { NestConfigModule } from "@lib/index";
import { NestJwtModule } from "@lib/jwt/jwt.module";
import { OrmModule } from "@lib/orm/orm.module";
import { AuthModule } from "@modules/auth/auth.module";
import { UserModule } from "@modules/user/user.module";
import { Module } from "@nestjs/common";

@Module({
	imports: [NestConfigModule, NestJwtModule, AuthModule, UserModule],
})
export class SharedModule {}
