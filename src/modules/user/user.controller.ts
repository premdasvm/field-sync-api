import {
	Body,
	ConflictException,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { JwtAuthGuard } from "@common/guards/jwt.guard";
import { User } from "./entities/user.entity";

@ApiTags("user")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post("create")
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
	}

	@Get("all")
	findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
		return this.userService.findOne(id);
	}
}
