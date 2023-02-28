import { LoggedInUser } from "@common/decorators/user.decorator";
import { JwtAuthGuard } from "@common/guards/jwt.guard";
import { User } from "@entities";
import { UseGuards, Controller, Patch, Post, Body } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AttendanceService } from "./attendance.service";
import { CheckInOutDto } from "./dtos/check-in-out.dto";

@ApiTags("attendance")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class AttendanceController {
	constructor(private readonly attendanceService: AttendanceService) {}

	@Post("checkIn")
	checkIn(@Body() dto: CheckInOutDto, @LoggedInUser() user: User) {
		return this.attendanceService.checkIn(user, dto);
	}

	@Post("checkOut")
	checkOut(@Body() dto: CheckInOutDto, @LoggedInUser() user: User) {
		return this.attendanceService.checkOut(user, dto);
	}
}
