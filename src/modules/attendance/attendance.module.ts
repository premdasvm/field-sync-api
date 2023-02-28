import { NestJwtModule } from "@lib/jwt/jwt.module";
import { OrmModule } from "@lib/orm/orm.module";
import { Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";

@Module({
	imports: [OrmModule, NestJwtModule],
	controllers: [AttendanceController],
	providers: [AttendanceService],
	exports: [AttendanceService],
})
export class AttendanceModule {}
