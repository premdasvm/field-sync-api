import { BaseRepository } from "@common/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepo: BaseRepository<User>) {}

	async create(dto: CreateUserDto) {
		const newUser = this.userRepo.create(dto);
		await this.userRepo.persistAndFlush(newUser);
		return newUser;
	}
}
