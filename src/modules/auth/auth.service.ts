import { TokenService } from "@modules/token/token.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
	constructor(private readonly tokenService: TokenService) {}

	login() {
		return this.tokenService.generateAccessToken("premdas");
	}
}
