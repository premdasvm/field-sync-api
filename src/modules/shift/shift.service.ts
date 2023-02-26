import { BaseRepository } from "@common/database";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateShiftDto } from "./dtos/create-shift.dto";
import { UpdateShiftDto } from "./dtos/update-shift.dto";
import { Shift } from "./entities/shift.entity";

@Injectable()
export class ShiftService {
	constructor(@InjectRepository(Shift) private readonly shiftRepo: BaseRepository<Shift>) {}

	async create(dto: CreateShiftDto) {
		const newShift = this.shiftRepo.create(dto);
		await this.shiftRepo.persistAndFlush(newShift);
	}

	async findAll() {
		return await this.shiftRepo.findAll();
	}

	async findOne(id: number) {
		return await this.shiftRepo.findOne(id);
	}

	async update(id: number, dto: UpdateShiftDto) {
		const shift = await this.findOne(id);

		if (!shift) {
			throw new NotFoundException(`Shift with ID ${id} not found`);
		}

		this.shiftRepo.assign(shift, dto);
		return await this.shiftRepo.flush();
	}
}
