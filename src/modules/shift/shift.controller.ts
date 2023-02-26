import { JwtAuthGuard } from "@common/guards/jwt.guard";
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateShiftDto } from "./dtos/create-shift.dto";
import { UpdateShiftDto } from "./dtos/update-shift.dto";
import { Shift } from "./entities/shift.entity";
import { ShiftService } from "./shift.service";

@ApiTags("shift")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class ShiftController {
	constructor(private readonly shiftService: ShiftService) {}

	@Post("create")
	create(@Body() dto: CreateShiftDto) {
		return this.shiftService.create(dto);
	}

	@Get("all")
	findAll(): Promise<Shift[]> {
		return this.shiftService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number): Promise<Shift> {
		return this.shiftService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateShiftDto) {
		return this.shiftService.update(id, dto);
	}
}
