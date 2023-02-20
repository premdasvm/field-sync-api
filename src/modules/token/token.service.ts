import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

@Injectable()
export class TokenService {
	constructor(private readonly jwt: JwtService) {}

	async generateAccessToken(userName: string) {
		const payLoad: JwtSignOptions = {
			subject: userName,
		};

		return await this.jwt.signAsync(payLoad);
	}
}
