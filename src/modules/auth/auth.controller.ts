import { Public } from "@common/decorators";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login.dto";

@ApiTags("auth")
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post("login")
	@ApiOperation({ summary: "User login" })
	login(@Body() dto: UserLoginDto) {
		return this.authService.login(dto);
	}
}
