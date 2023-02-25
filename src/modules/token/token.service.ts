import { User } from "@entities";
import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { pick } from "helper-fns";

@Injectable()
export class TokenService {
	constructor(private readonly jwt: JwtService) {}

	/**
	 * It takes a user object, and returns an observable of a string
	 * @param user - Omit<User, "password">
	 * @returns An Observable of a string.
	 */
	async generateAccessToken(user: Omit<User, "password">): Promise<string> {
		const options: JwtSignOptions = {
			subject: String(user.id),
		};

		return await this.jwt.signAsync({ ...pick(user, ["role"]) }, options);
	}
}
