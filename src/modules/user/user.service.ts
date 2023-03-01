import { BaseRepository } from "@common/database";
import { GeolocationDto } from "@common/dtos";
import { UserShift, User } from "@entities";
import { LoadStrategy } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AssignShiftDto } from "./dtos/assign-shift.dto";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepo: BaseRepository<User>,
		@InjectRepository(UserShift) private userShiftRepo: BaseRepository<UserShift>,
	) {}

	async create(dto: CreateUserDto) {
		try {
			const newUser = this.userRepo.create(dto);
			await this.userRepo.persistAndFlush(newUser);
			return newUser;
		} catch (error) {
			if (error.constraint == "user_mobile_number_unique") {
				throw new ConflictException(`Mobile number already exists.`);
			}

			throw error;
		}
	}

	async findAll() {
		return await this.userRepo.findAll();
	}

	async findOne(id: number) {
		const user = await this.userRepo.findOne(id, {
			populate: ["shifts"],
			fields: ["shifts.name", "shifts.startTime", "shifts.endTime"],
		});

		if (!user) {
			throw new NotFoundException(`User does not exist`);
		}

		return user;
	}

	async assignShifts(userId: number, { shifts }: AssignShiftDto) {
		try {
			const userShifts = shifts.map(id => {
				return this.userShiftRepo.create({
					shift: id,
					user: userId,
				});
			});

			this.userShiftRepo.persistAndFlush(userShifts);
		} catch (error) {
			throw error;
		}
	}

	async updateShiftLocation(shiftId: number, dto: GeolocationDto, loggedInUser: User) {
		const userShift = await this.userShiftRepo.findOne({
			shift: { id: shiftId },
			user: loggedInUser,
		});

		userShift.coordinates = { latitude: dto.latitude, longitude: dto.longitude };

		await this.userShiftRepo.persistAndFlush(userShift);
	}
}
