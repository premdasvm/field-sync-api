import { BaseRepository } from "@common/database";
import { DateService } from "@common/helpers";
import { Activity } from "@common/types";
import { User } from "@entities";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ConflictException, Injectable } from "@nestjs/common";
import { format, startOfDay } from "date-fns";
import { isEmpty } from "helper-fns";
import { from, map } from "rxjs";
import { CheckInOutDto } from "./dtos/check-in-out.dto";

import { Attendance } from "./entities/attendance.entity";

@Injectable()
export class AttendanceService {
	constructor(@InjectRepository(Attendance) private attendanceRepo: BaseRepository<Attendance>) {}

	async onModuleInit() {
		console.log(DateService.today());
	}

	async checkIn(loggedInUser: User, dto: CheckInOutDto) {
		// const isCheckedIn = await this.attendanceRepo
		// 	.createQueryBuilder("a")
		// 	.where({ shift: dto.shift, user: loggedInUser, type: Activity.CHECK_IN })
		// 	.andWhere("date(a.created_at) = ?", [DateService.today()])
		// 	.execute("all");

		// if (!isEmpty(isCheckedIn)) {
		// 	throw new ConflictException(`Already Checked in for this shift for today.`);
		// }

		try {
			const checkIn = this.attendanceRepo.create({
				shift: dto.shift,
				coordinates: dto.coordinates,
				type: Activity.CHECK_IN,
				user: loggedInUser,
			});
			await this.attendanceRepo.persistAndFlush(checkIn);
			return { message: "Check In Successful" };
		} catch (error) {
			throw error;
		}
	}

	async checkOut(loggedInUser: User, dto: CheckInOutDto) {
		const checkOut = this.attendanceRepo.create({
			shift: dto.shift,
			coordinates: dto.coordinates,
			type: Activity.CHECK_OUT,
			user: loggedInUser,
		});
		this.attendanceRepo.persistAndFlush(checkOut);
		return { message: "Check Out Successful" };
	}
}
