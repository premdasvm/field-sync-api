import { BaseRepository } from "@common/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepo: BaseRepository<User>) {}

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
			fields: ["*", "shifts.name", "shifts.startTime", "shifts.endTime"],
		});

		if (!user) {
			throw new NotFoundException(`User does not exist`);
		}

		return user;
	}
}
