import { NestJwtModule } from "@lib/jwt/jwt.module";
import { OrmModule } from "@lib/orm/orm.module";
import { Module } from "@nestjs/common";
import { ShiftController } from "./shift.controller";
import { ShiftService } from "./shift.service";

@Module({
	imports: [OrmModule, NestJwtModule],
	controllers: [ShiftController],
	providers: [ShiftService],
	exports: [ShiftService],
})
export class ShiftModule {}
