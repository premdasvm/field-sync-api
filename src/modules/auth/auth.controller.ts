import { Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	@ApiOperation({ summary: "User login" })
	login() {
		return this.authService.login();
	}
}
