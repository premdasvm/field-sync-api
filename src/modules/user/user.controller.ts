import {
	Body,
	Controller,
	Get,
	Param,
	ParseArrayPipe,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { JwtAuthGuard } from "@common/guards/jwt.guard";
import { User } from "./entities/user.entity";
import { Public } from "@common/decorators";
import { AssignShiftDto } from "./dtos/assign-shift.dto";
import { GeolocationDto } from "@common/dtos";
import { LoggedInUser } from "@common/decorators/user.decorator";

@ApiTags("user")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Post("create")
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
	}

	@Get("all")
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.userService.findOne(id);
	}

	@Post("assignShift/:userId")
	assignShift(@Param("userId") userId: number, @Body() dto: AssignShiftDto) {
		return this.userService.assignShifts(userId, dto);
	}

	@Patch("updateShiftLocation/:shiftId")
	updateShiftLocation(
		@Param("shiftId") shiftId: number,
		@Body() dto: GeolocationDto,
		@LoggedInUser() user: User,
	) {
		return this.userService.updateShiftLocation(shiftId, dto, user);
	}
}
